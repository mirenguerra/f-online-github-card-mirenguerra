import React from "react";
import "./styles.scss";
import InputFilter from "../InputFilter";
import getDataList from "../../services/getAdalabersDataList";
import getAdalaberData from "../../services/getAdalaberData";
import UserCard from "../UserCard";
import logoAdalab from "../../images/logo-adalab.png";

const adalabersData = [];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adalabersList: JSON.parse(localStorage.getItem("adalabersList")) || [],
      selectedAdalaber: "",
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    if (this.state.adalabersList.length === 0) {
      this.fetchAdalabersList();
    }
  }

  fetchAdalabersList() {
    getDataList()
      .then(users => {
        if (users) {
          users.map(user => {
            return this.fetchAdalaberData(user.url);
          });
        } else {
          console.log("Error");
        }
      })
      .catch(function() {
        alert("No se ha podido conectar. Inténtalo de nuevo");
      });
  }

  fetchAdalaberData(url) {
    getAdalaberData(url)
      .then(data => {
        if (data) {
          adalabersData.push(data);

          this.setState({ adalabersList: [...adalabersData] });
          this.saveAdalabersLS(adalabersData);
        } else {
          console.log("Error");
        }
      })
      .catch(function() {
        alert("No se ha podido conectar. Inténtalo de nuevo");
      });
  }

  saveAdalabersLS(users) {
    localStorage.setItem("adalabersList", JSON.stringify(users));
  }

  handleSelect(event) {
    this.setState({ selectedAdalaber: event.target.value });
  }

  render() {
    const { adalabersList, selectedAdalaber } = this.state;
    return (
      <section className="App">
        <main>
          <InputFilter
            adalabersList={adalabersList}
            handleSelect={this.handleSelect}
          />
          <UserCard
            adalabersList={adalabersList}
            selectedAdalaber={selectedAdalaber}
          />
        </main>
        <footer>
          <img
            className="App__footer-logo"
            src={logoAdalab}
            alt="Logo de Adalab"
          />
        </footer>
      </section>
    );
  }
}

export default App;
