export { };

declare global {
    interface Window {
        hrkltzio_load(pPath: string): void
        hrkltzio_listOnClick(): void
        hrkltzio_createOnClick(): void
        hrkltzio_delete(pPath: string): void
    }
}
