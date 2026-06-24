import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { User } from "@/types";

const usersFilePath = path.join(process.cwd(), "data", "utilisateurs.json");

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, nom, prenom, email, avatar } = body;

    if (!id) {
      return NextResponse.json({ message: "L'ID utilisateur est requis" }, { status: 400 });
    }

    if (!fs.existsSync(usersFilePath)) {
      return NextResponse.json({ message: "Base de données non trouvée" }, { status: 404 });
    }

    const fileContent = fs.readFileSync(usersFilePath, "utf8");
    const users: User[] = JSON.parse(fileContent);

    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
    }

    // Update user fields
    users[userIndex] = {
      ...users[userIndex],
      nom: nom || users[userIndex].nom,
      prenom: prenom || users[userIndex].prenom,
      email: email || users[userIndex].email,
      avatar: avatar || users[userIndex].avatar,
    };

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    return NextResponse.json(
      { message: "Profil mis à jour avec succès", user: users[userIndex] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur PUT /api/user/profile:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
