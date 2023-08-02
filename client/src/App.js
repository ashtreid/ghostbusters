import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Map from './pages/Map';
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className='d-flex flex-column min-vh-100'>
        <Header />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/paranormal'
            element={<Map />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;





// import React from 'react';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Header from './components/Header';

// const App = () => {
//   return (
//     <Router>
//       <>
//       <Header />
//       <Routes>
//         <Route 
//         path='/'
//         element={<Home />}
//         />
//       </Routes>
//       </>
//     </Router>
//   );
// };

// export default App;




// __________PAUSE__________________________________
// import React from 'react';
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Home from './pages/Home';
// import Header from './components/Header'
// // import Footer from './components/Footer';

// // Construct our main GraphQL API endpoint
// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

// // Construct request middleware that will attach the JWT token to every request as an `authorization` header
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('id_token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const client = new ApolloClient({
//   // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <Router>
//         <div className="flex-column justify-flex-start min-100-vh">
//           <Header />
//           <div className="container">
//             <Routes>
//               <Route 
//                 path="/"
//                 element={<Home />}
//               />
//               {/* <Route 
//                 path="/login"
//                 element={<Login />}
//               />
//               <Route 
//                 path="/signup"
//                 element={<Signup />}
//               />
//               <Route 
//                 path="/me"
//                 element={<Profile />}
//               />
//               <Route 
//                 path="/profiles/:username"
//                 element={<Profile />}
//               />
//               <Route 
//                 path="/thoughts/:thoughtId"
//                 element={<SingleThought />}
//               /> */}
//             </Routes>
//           </div>
//           {/* <Footer /> */}
//         </div>
//       </Router>
//     </ApolloProvider>
//   );
// }

// export default App;
