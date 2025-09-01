export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
                <h1 className="text-lg font-medium text-muted-foreground">
                    This is about to change your life...
                </h1>
            </div>
        </div>
    );
}
