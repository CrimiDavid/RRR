import {useSuspenseQuery} from "@tanstack/react-query";
import {getPosts} from "@/lib/api/posts";

export function useRepos(page, selection) {
    return useSuspenseQuery({
        queryKey: ['repos', {page}, {selection}],
        queryFn: () => getPosts(page, selection),
    })
}