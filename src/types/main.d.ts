
interface MDAAttributes{
    id: string,
    abbreviation: string,
    name: string
    createdAt: Date,
    updatedAt: Date
}

interface AppResponse<T> {
    message: string;
    status: 'success' | 'error' | 'warning' | 'info';
    data: T | null;
}
