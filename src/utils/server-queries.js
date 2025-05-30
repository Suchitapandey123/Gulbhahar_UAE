// src/lib/server-queries.js
export async function getServerSideProps() {
    const queryClient = new QueryClient()
    
    await queryClient.prefetchQuery({
      queryKey: ['posts'],
      queryFn: () => fetch('http://localhost:3000/api/posts').then(res => res.json())
    })
  
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  }