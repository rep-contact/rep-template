import React from "react";

// const defaultState = {
//   representativeData: {},
//   addRepresentativeData: (data) => {},
// };

// const RepresentativeContext = React.createContext(defaultState);

// class RepresentativeProvider extends React.Component {
//   state = {
//     representativeData: {},
//   };

//   addRepresentativeData = (data) => {
//     this.setState({ data });
//   };

//   //   componentDidMount() {
//   //     // Getting dark mode value from localStorage!
//   //     const lsDark = JSON.parse(localStorage.getItem("dark"));
//   //     if (lsDark) {
//   //       this.setState({ dark: lsDark });
//   //     } else if (supportsDarkMode()) {
//   //       this.setState({ dark: true });
//   //     }
//   //   }

//   render() {
//     const { children } = this.props;
//     const { representativeData } = this.state;
//     return (
//       <RepresentativeContext.Provider
//         value={{
//           representativeData,
//           addRepresentativeData: this.addRepresentativeData,
//         }}
//       >
//         {children}
//       </RepresentativeContext.Provider>
//     );
//   }
// }

// export default RepresentativeContext;

// export { RepresentativeProvider };

const {Provider, Consumer} = React.createContext({})

export {Provider, Consumer}