import {useSuspenseQuery} from "@tanstack/react-query";
import {getPosts} from "@/lib/api/posts";

export function useRepos(page) {
    return useSuspenseQuery({
        queryKey: ['repos', {page }],
        queryFn: () => getPosts(page),
    })
}