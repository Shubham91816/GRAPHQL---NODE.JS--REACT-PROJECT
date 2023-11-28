
import './App.css';
import { gql, useQuery } from "@apollo/client";

const query = gql`
query AllTODOES {
  getTodos {
    title
  }
  getAllUsers {
    email
  }
}
`;

function App() {
  const { loading, error, data } = useQuery(query);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>{error.message}</p>;
  console.log(data);
  return (
    <div>
      <h1>TODO GRAPHQL API Fetch data by using apollo client</h1>
      <h2>Fetch data successfully available in console & also on user screen</h2>
      <h1>User Email id </h1>
      {
        data.getAllUsers.map((element)=>{
          return <p>{element.email}</p>})
      }

      <h1>TODO TITLE</h1>
      {
        data.getTodos.map((element)=>{
          return <h4>{element.title}</h4>})
      }
    

    </div>
  );
}

export default App;