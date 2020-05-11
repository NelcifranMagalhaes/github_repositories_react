import React, { Component } from 'react';
import { Container, SubmitButton, Form } from './styles.js';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'
import api from '../../services/api';



export default class Main extends Component {
  state = {
    newRepo: "",
    repositories: [],
    loading: false,
  };

  handleInputchange = e=>{
    this.setState({newRepo: e.target.value});
  };

  handleSubmit = async e => {

    e.preventDefault();
    const { newRepo, repositories} = this.state;

    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [ ...repositories, data],
      newRepo: '',
    });
  };

  render(){
    const {newRepo, loading} = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit ={this.handleSubmit}>
          <input
            type= "text"
            placeholder= "Adicionar Repositório"
            value={newRepo} onChange = {this.handleInputchange}/>

          <SubmitButton loading={loading ? loading : undefined}>
            { loading ? ( <FaSpinner color="#FFF" size={20}/>) : (<FaPlus color="#FFF" size={20}/>) }
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
