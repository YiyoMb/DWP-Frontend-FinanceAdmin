import React, { useState, useEffect } from "react";

const DiscussionForum = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [newPostTitle, setNewPostTitle] = useState("");
    const [category, setCategory] = useState("General");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comment, setComment] = useState("");
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const categories = [
        "General",
        "Ahorros",
        "Inversiones",
        "Presupuestos",
        "Educación Financiera",
        "Crecimiento Personal"
    ];

    // Verificar autenticación al cargar el componente
    useEffect(() => {
        checkAuth();
    }, []);

    // Cargar los posts al inicio y cuando cambie la página o categoría
    useEffect(() => {
        fetchPosts();
    }, [currentPage, category]);

    // Función para verificar si el usuario está autenticado
    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            setUser(null);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/user`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setIsAuthenticated(true);
                console.log("Usuario autenticado")
            } else {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                setUser(null);
                console.log("Usuario no autenticado")
            }
        } catch (err) {
            console.error("Error al verificar autenticación:", err);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts?page=${currentPage}&category=${category}`);

            if (!response.ok) {
                throw new Error('Error al cargar los posts');
            }

            const data = await response.json();
            setPosts(data.data);
            setTotalPages(data.pagination.totalPages);
            setLoading(false);
        } catch (err) {
            setError("Error al cargar los posts");
            setLoading(false);
            console.error(err);
        }
    };

    const handlePostSubmit = async () => {
        if (newPostTitle.trim() === "" || newPost.trim() === "") {
            return;
        }

        try {
            if (!isAuthenticated) {
                alert("Debes iniciar sesión para publicar");
                return;
            }

            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: newPostTitle,
                    content: newPost,
                    category
                })
            });

            if (!response.ok) {
                throw new Error('Error al crear la publicación');
            }

            const data = await response.json();

            // Añadir el nuevo post al principio de la lista
            setPosts([data.data, ...posts]);
            setNewPostTitle("");
            setNewPost("");
        } catch (err) {
            setError("Error al crear la publicación");
            console.error(err);
        }
    };

    const handlePostClick = async (postId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`);

            if (!response.ok) {
                throw new Error('Error al cargar el post');
            }

            const data = await response.json();
            setSelectedPost(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLike = async (postId) => {
        try {
            if (!isAuthenticated) {
                alert("Debes iniciar sesión para dar like");
                return;
            }

            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al dar like');
            }

            // Actualizar la lista de posts
            fetchPosts();

            // Si hay un post seleccionado, actualizarlo también
            if (selectedPost && selectedPost._id === postId) {
                handlePostClick(postId);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCommentSubmit = async () => {
        if (!selectedPost || comment.trim() === "") return;

        try {
            if (!isAuthenticated) {
                alert("Debes iniciar sesión para comentar");
                return;
            }

            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${selectedPost._id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: comment
                })
            });

            if (!response.ok) {
                throw new Error('Error al comentar');
            }

            // Actualizar el post seleccionado para mostrar el nuevo comentario
            handlePostClick(selectedPost._id);
            setComment("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Foro de Discusión</h2>

            {/* Crear Nuevo Post */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-md font-medium mb-2">Crear nueva publicación</h3>

                <input
                    type="text"
                    className="w-full p-2 border rounded-lg mb-2"
                    placeholder="Título de tu publicación"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                />

                <textarea
                    className="w-full p-2 border rounded-lg mb-2"
                    rows="3"
                    placeholder="Contenido de tu publicación..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                />

                <div className="flex flex-col md:flex-row justify-between mb-2">
                    <select
                        className="p-2 border rounded-lg mb-2 md:mb-0"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        onClick={handlePostSubmit}
                        disabled={!isAuthenticated}
                    >
                        Publicar
                    </button>
                </div>

                {!isAuthenticated && (
                    <p className="text-sm text-gray-500 mt-1">Debes iniciar sesión para publicar</p>
                )}
            </div>

            {/* Filtro por categoría */}
            <div className="mb-4">
                <select
                    className="p-2 border rounded-lg"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="">Todas las categorías</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Vista de Post Seleccionado */}
            {selectedPost && (
                <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-medium">{selectedPost.title}</h3>
                            <p className="text-sm text-gray-500">
                                Por: {selectedPost.user.fullName || selectedPost.user.email} •
                                {new Date(selectedPost.createdAt).toLocaleDateString()}
                            </p>
                            <span className="inline-block px-2 py-1 bg-gray-100 text-xs rounded mt-1">
                                {selectedPost.category}
                            </span>
                        </div>
                        <button
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => setSelectedPost(null)}
                        >
                            ✕
                        </button>
                    </div>

                    <p className="my-3">{selectedPost.content}</p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                        <button
                            className={`flex items-center mr-3 ${
                                isAuthenticated &&
                                selectedPost.likes.includes(user._id) ? 'text-blue-500' : ''}`
                            }
                            onClick={() => handleLike(selectedPost._id)}
                        >
                            <span className="mr-1">👍</span>
                            {selectedPost.likes.length} Me gusta
                        </button>
                        <span>{selectedPost.comments.length} Comentarios</span>
                    </div>

                    {/* Añadir un comentario */}
                    <div className="mb-4">
                        <textarea
                            className="w-full p-2 border rounded-lg mb-2"
                            rows="2"
                            placeholder="Escribe un comentario..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                            onClick={handleCommentSubmit}
                            disabled={!isAuthenticated}
                        >
                            Comentar
                        </button>
                    </div>

                    {/* Lista de comentarios */}
                    <div className="space-y-3 mt-4">
                        <h4 className="font-medium">Comentarios</h4>
                        {selectedPost.comments.length === 0 ? (
                            <p className="text-sm text-gray-500">Sin comentarios aún.</p>
                        ) : (
                            selectedPost.comments.map((comment, idx) => (
                                <div key={idx} className="p-2 bg-gray-50 rounded border">
                                    <p className="text-sm font-medium">
                                        {comment.user.fullName || comment.user.email}
                                    </p>
                                    <p className="text-sm">{comment.content}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Lista de Posts */}
            {loading ? (
                <div className="text-center py-8">Cargando publicaciones...</div>
            ) : error ? (
                <div className="text-center py-4 text-red-500">{error}</div>
            ) : (
                <div className="space-y-4">
                    {posts.length === 0 ? (
                        <p className="text-center py-4 text-gray-500">No hay publicaciones en esta categoría.</p>
                    ) : (
                        posts.map((post) => (
                            <div
                                key={post._id}
                                className="border p-4 rounded-lg hover:shadow-md transition cursor-pointer"
                                onClick={() => handlePostClick(post._id)}
                            >
                                <div className="flex justify-between">
                                    <h3 className="font-medium">{post.title}</h3>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{post.category}</span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{post.content}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-xs text-gray-500">
                                        Por: {post.user.fullName || post.user.email} •
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <span className="mr-2">👍 {post.likes.length}</span>
                                        <span>💬 {post.comments.length}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6">
                    <button
                        className="mx-1 px-3 py-1 border rounded disabled:opacity-50"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>

                    <span className="mx-2 px-2 py-1 bg-gray-100 rounded">
                        {currentPage} de {totalPages}
                    </span>

                    <button
                        className="mx-1 px-3 py-1 border rounded disabled:opacity-50"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </div>
            )}
        </div>
    );
};

export default DiscussionForum;