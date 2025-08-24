"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

export function CreatorCarousel() {
    const [users, setUsers] = React.useState<Array<{ name: string; fame: string; avatar?: string }>>([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        let ignore = false
        const fetchUsers = async () => {
            try {
                setLoading(true)
                setError(null)
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/discover/all` )
                if (ignore) {
                    return
                }
                if (!res.ok) throw new Error(`Request failed: ${res.status}`)
                const data = await res.json()
                setUsers(data.users ?? [])
            } catch (err: any) {
                if (err.name !== "AbortError") setError(err.message ?? "Something went wrong")
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
        return () => ignore = true
    }, [])

    const isEmpty = !loading && !error && users.length === 0
    const skeletonCount = 6

    // Helper function to get initials from name
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('')
    }

    return (
        <div className="w-full p-4 sm:p-8 rounded-2xl">
            <Carousel
                className="w-full max-w-6xl mx-auto"
                opts={{ align: "center", containScroll: "trimSnaps" }}
                aria-busy={loading ? "true" : "false"}
                aria-live="polite"
            >
                <CarouselContent className="-ml-1 sm:-ml-2 flex justify-center sm:justify-start">
                    {loading
                        ? Array.from({ length: skeletonCount }).map((_, i) => (
                            <CarouselItem
                                key={`skeleton-${i}`}
                                className="pl-1 sm:pl-2 basis-auto flex-shrink-0 flex justify-center"
                            >
                                <div className="p-1">
                                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-3xl w-48 sm:w-52">
                                        <CardContent className="p-4">
                                            <div className="flex flex-col items-center space-y-2">
                                                <Skeleton className="h-12 w-12 rounded-full" />
                                                <div className="space-y-1 text-center w-full">
                                                    <Skeleton className="h-4 w-3/4 mx-auto" />
                                                    <Skeleton className="h-3 w-1/2 mx-auto" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))
                        : users.map((user, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-1 sm:pl-2 basis-auto flex-shrink-0 flex justify-center"
                            >
                                <div className="p-1">
                                    <Card className="group w-48 sm:w-52 border-0  shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden rounded-3xl">
                                        <div className="flex inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <CardContent className="relative p-4">
                                            <div className="flex flex-col items-center space-y-2">
                                                <div className="relative">
                                                    <Avatar className="h-12 w-12 ring-2 ring-slate-200 dark:ring-slate-700 group-hover:ring-blue-400 dark:group-hover:ring-blue-500 transition-all duration-300">
                                                        <AvatarImage
                                                            src={user.avatar}
                                                            alt={`${user.name}'s avatar`}
                                                            className="object-cover"
                                                        />
                                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-base">
                                                            {getInitials(user.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" />
                                                </div>

                                                <div className="text-center space-y-0.5 min-h-[2.5rem] flex flex-col justify-center">
                                                    <h3 className="font-semibold text-base leading-tight text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                                        {user.name}
                                                    </h3>
                                                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                                                        {user.fame}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                </CarouselContent>

                {/* Disable nav while loading to avoid confusing interactions */}
                {/*<CarouselPrevious disabled={loading} className="hover:bg-blue-50 dark:hover:bg-blue-950" />*/}
                {/*<CarouselNext disabled={loading} className="hover:bg-blue-50 dark:hover:bg-blue-950" />*/}

                {/* Lightweight empty + error states that keep layout intact */}
                {isEmpty && (
                    <div className="px-2 py-4 text-sm text-slate-500 dark:text-slate-400 text-center">
                        No creators yet.
                    </div>
                )}
                {!!error && !loading && (
                    <div className="px-2 py-4 text-sm text-red-600 dark:text-red-400 text-center">
                        Failed to load: {error}
                    </div>
                )}
            </Carousel>
        </div>
    )
}