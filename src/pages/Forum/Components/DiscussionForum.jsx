import React, { useState } from "react";

const DiscussionForum = () => {
    const [posts, setPosts] = useState([
        { id: 1, user: "Juan Pérez", content: "¿Cuál es la mejor estrategia para ahorrar en gastos mensuales?" },
        { id: 2, user: "Ana López", content: "Comparto mi experiencia sobre inversiones en fondos indexados..." },
    ]);

    const [newPost, setNewPost] = useState("");

    const handlePost = () => {
        if (newPost.trim() === "") return;

        setPosts([{ id: Date.now(), user: "Usuario", content: newPost }, ...posts]);
        setNewPost("");
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Foro de Discusión</h2>
            <div className="mb-4">
        <textarea
            className="w-full p-2 border rounded-lg"
            rows="3"
            placeholder="Escribe un comentario..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
        />
                <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handlePost}
                >
                    Publicar
                </button>
            </div>
            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post.id} className="border p-3 rounded-lg shadow-sm bg-gray-100">
                        <p className="text-sm text-gray-700 font-semibold">{post.user}</p>
                        <p className="text-gray-800">{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscussionForum;
