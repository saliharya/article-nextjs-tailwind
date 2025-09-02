export function getErrorMessage(error: unknown): string {
    if (!error) return "";
    if (typeof error === "string") return error;
    if (typeof error === "object") {
        if ('message' in error && typeof (error as any).message === 'string') {
            return (error as any).message;
        }
        if ('error' in error && typeof (error as any).error === 'string') {
            return (error as any).error;
        }
        if ('detail' in error && typeof (error as any).detail === 'string') {
            return (error as any).detail;
        }
        return JSON.stringify(error);
    }
    return "Something went wrong";
}