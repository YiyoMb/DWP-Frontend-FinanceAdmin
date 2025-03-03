import LoginForm from "./Components/LoginForm";

const Login = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Iniciar sesión</h2>
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
