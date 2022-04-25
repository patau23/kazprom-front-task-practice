export const usersQuery = JSON.stringify({
  query: `query (
    $options: PageQueryOptions
  ) {
    users(options: $options) {
      data {
        id
        username
        name
        email
        address{
          street
          suite
          city
          geo {
            lat
            lng
          }
          zipcode
        }
        phone
        website
      }
      links {
        first {
          page
          limit
        }
        prev {
          page
          limit
        }
        next {
          page
          limit
        }
        last {
          page
          limit
        }
      }
      meta {
        totalCount
      }
    }
  }`,
  variables: {
    options: {
      paginate: {
        page: 1,
        limit: 10,
      },
    },
  },
});

export const usersQueryWithPosts = JSON.stringify({
  query: `query (
        $options: PageQueryOptions
      ) {
        users(options: $options) {
          data {
            id
            username
            name
            email
            address{
              street
              suite
              city
              geo {
                lat
                lng
              }
              zipcode
            }
            phone
            website
            posts (options: $options){
              data {
                id
                title
                body
              }
            }
          }
          links {
            first {
              page
              limit
            }
            prev {
              page
              limit
            }
            next {
              page
              limit
            }
            last {
              page
              limit
            }
          }
          meta {
            totalCount
          }
        }
      }`,
  variables: {
    options: {
      paginate: {
        page: 1,
        limit: 10,
      },
    },
  },
});
