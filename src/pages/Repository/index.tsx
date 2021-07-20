import React, { useState, useEffect } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

import { Header, RepositoryInfo, Issues } from "./styles";

interface RepositoryParams {
  repository: string;
}

interface Repositorio {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repositorio | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((response) => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img
            src="https://avatars.githubusercontent.com/u/69631?s=200&v=4"
            alt="Facebook"
          />
          <div>
            <strong>Facebook</strong>
            <p>Repositório do ReactJS no GitHub do Facebook</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>172K</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>34K</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>574</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        <Link to={`teste`}>
          <img
            src="https://avatars.githubusercontent.com/u/46034178?v=4"
            alt="Johnatan"
          />
          <div>
            <strong>Facebook</strong>
            <p>Descrição do repositório</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  );
};

export default Repository;
