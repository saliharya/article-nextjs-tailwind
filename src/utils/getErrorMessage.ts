export function getErrorMessage(error: unknown): string {
    if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: unknown }).response === "object" &&
        (error as { response?: { data?: { error?: string } } }).response !== null
    ) {
        const err = error as { response?: { data?: { error?: string }, message?: string }, message?: string };
        return err.response?.data?.error ?? err.message ?? "Unknown error";
    }

    if (typeof error === "string") {
        return error;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Unknown error";
}
