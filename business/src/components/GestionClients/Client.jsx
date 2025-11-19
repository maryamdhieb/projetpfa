import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Spinner, Container, Alert } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Client.css";

const Client = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const fetchToken = async () => {
  try {
    const res = await fetch("/T6/Authentification", {
      method: "POST",
      headers: {
        Authorization: `Bearer telesys2025`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Utilisateur: "Youssef",
        Login: "YoussefSellami",
        Pass: "telesys2025",
      }),
    });

    if (!res.ok) throw new Error("Échec de l’authentification");
    const data = await res.json();
    console.log("✅ Token reçu :", data.Token);
    return data.Token; // on retourne le token seulement
  } catch (err) {
    console.error(err);
    setError("Impossible de récupérer le token");
    return null;
  }
};

// Étape 2 : Charger la liste des clients avec le token
const fetchClients = async (token) => {
  try {
    const res = await fetch("/T6/Agent/000001/*", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ ici on utilise le paramètre token
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Erreur de chargement des clients");
    const data = await res.json();
    console.log("✅ Clients chargés :", data);
    setClients(data);
  } catch (err) {
    console.error(err);
    setError("Impossible de charger la liste des clients");
  } finally {
    setLoading(false);
  }
};

// Étape 3 : Appel automatique au montage
useEffect(() => {
  const init = async () => {
    const token = await fetchToken(); // ✅ récupère le token
    if (token) {
      await fetchClients(token); // ✅ on le transmet à la fonction suivante
    } else {
      setLoading(false);
    }
  };
  init();
}, []);

  // 🔧 Suppression
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce client ?")) {
      alert(`Suppression du client ${id} (à implémenter)`);
      // tu pourras ici faire un fetch DELETE comme avant
    }
  };

  // ✏️ Modification
  const handleEdit = (id) => {
    alert(`Modifier le client ID: ${id}`);
  };

  // 🌀 Chargement
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // ⚠️ Erreur
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  // ✅ Tableau des clients
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Liste des Clients</h2>
      <div className="table-responsive shadow p-3 mb-5 bg-white rounded">
        <Table bordered hover className="align-middle text-center">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Adresse</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.Agent}>
                <td>{client.NomAgent}</td>
                <td>{client.Lib}</td>
                <td>{client.Mail}</td>
                <td>{client.Tel}</td>
                <td></td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(client.NC)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(client.NC)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Client;
