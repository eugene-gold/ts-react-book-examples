import { useState } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { getRepo } from '../api/getRepo';
import { GET_REPO } from '../api/getRepo';
// import { starRepo } from '../api/starRepo';
import { STAR_REPO } from '../api/starRepo';
import { RepoData, SearchCriteria } from '../api/types';
import { SearchRepoForm } from './SearchRepoForm';
import { FoundRepo } from './FoundRepo';
import { StarRepoButton } from './StarRepoButton';
import { useLazyQuery, useMutation, useApolloClient } from '@apollo/client/react';

export function RepoPage() {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | undefined>();
  //   const { data } = useQuery(
  //     ['repo', searchCriteria],
  //     () => getRepo(searchCriteria as SearchCriteria),
  //     {
  //       enabled: searchCriteria !== undefined,
  //     },
  //   );
  const [getRepo, { data }] = useLazyQuery(GET_REPO);

  //   const queryClient = useQueryClient();
  const queryClient = useApolloClient();

  //   const { mutate } = useMutation(starRepo, {
  //     onSuccess: () => {
  //       queryClient.setQueryData<RepoData>(['repo', searchCriteria], (repo) => {
  //         if (repo === undefined) {
  //           return undefined;
  //         }
  //         return {
  //           ...repo,
  //           viewerHasStarred: true,
  //         };
  //       });
  //     },
  //   });

  const [starRepo] = useMutation(STAR_REPO, {
    onCompleted: () => {
      queryClient.cache.writeQuery({
        query: GET_REPO,
        data: {
          repository: {
            ...data.repository,
            viewerHasStarred: true,
          },
        },
        variables: searchCriteria,
      });
    },
  });

  function handleSearch(search: SearchCriteria) {
    getRepo({
      variables: { ...search },
    });
    setSearchCriteria(search);
  }

  function handleStarClick() {
    if (data) {
      //   mutate(data.repository.id);
      starRepo({ variables: { repoId: data.repository.id } });
    }
  }

  return (
    <main className="max-w-xs ml-auto mr-auto">
      <SearchRepoForm onSearch={handleSearch} />
      {data && (
        <>
          <FoundRepo
            name={data.repository.name}
            description={data.repository.description}
            stars={data.repository.stargazers.totalCount}
          />
          {!data.repository.viewerHasStarred && <StarRepoButton onClick={handleStarClick} />}
        </>
      )}
    </main>
  );
}
