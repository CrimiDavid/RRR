import {useSuspenseQuery} from "@tanstack/react-query";
import {getPosts} from "@/lib/api/posts";

export function useRepos(page, selection, filter) {
    return useSuspenseQuery({
        queryKey: ['repos', {page}, {selection}, {filter}],
        queryFn: () => getPosts(page, selection, filter),
    })
}