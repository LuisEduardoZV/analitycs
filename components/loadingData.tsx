import { Spinner } from "@heroui/spinner";

const LoadingData = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <span className="text-2xl text-center font-semibold">Espere un momento</span>
            <Spinner size="lg" color="primary" label="Cargando..." />
        </div>
    )
}

export default LoadingData