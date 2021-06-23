import React from 'react';
import styled from 'styled-components';
import { Template } from '../components/template';
import { api } from '../services/api';
import Link from 'next/link';

export default function Home() {
  const [listaDePlanos, setListaDePlanos] = React.useState();
  React.useEffect(() => {
    const listarPlanos = async () => {
      let sql = `
      SELECT T148ID,
        T148DESCRICAO,
        T148DESTAQUE,
        T148PLANOGRATUITO,
        T148PERIODOTESTE,
        T148IDFRANQUEADO,
        T148ASSINATURAS,
        T148USUARIOS,
        T148ARMAZENAMENTO,
        CASE
          WHEN T144RUBRICARELATORIOS = 'S' THEN '<i className="fas fa-check text-success"></i>' 
          ELSE '<i className="fas fa-times text-danger"></i>'  
        END
        AS T144RUBRICARELATORIOS,
        CASE
          WHEN T148VALIDADEJURIDICA = 'S' THEN '<i className="fas fa-check text-success"></i>' 
          ELSE '<i className="fas fa-times text-danger"></i>'  
        END
        AS T148VALIDADEJURIDICA,
        CASE
          WHEN T148TOKENEMAIL = 'S' THEN '<i className="fas fa-check text-success"></i>' 
          ELSE '<i className="fas fa-times text-danger"></i>'  
        END
        AS T148TOKENEMAIL,
        CASE
          WHEN T148TOKENSMS = 'S' THEN '<i className="fas fa-check text-success"></i>' 
          ELSE '<i className="fas fa-times text-danger"></i>'  
        END
        AS T148TOKENSMS,
        CASE
          WHEN T148TOKENWHATSAPP = 'S' THEN '<i className="fas fa-check text-success"></i>' 
          ELSE '<i className="fas fa-times text-danger"></i>'  
        END
        AS T148TOKENWHATSAPP,
        CASE
          WHEN T148WEB = 'S' THEN '<i className="fas fa-check text-success"></i>' 
          ELSE '<i className="fas fa-times text-danger"></i>'  
        END
        AS T148WEB,
        CASE
          WHEN T148MOBILE = 'S' THEN '<i className="fas fa-check text-success"></i>' 
          ELSE '<i className="fas fa-times text-danger"></i>'  
        END
        AS T148MOBILE,
        CASE
          WHEN T148ALERTAVENCASS = 'S' THEN '<i className="fas fa-check text-success"></i>' 
          ELSE '<i className="fas fa-times text-danger"></i>'  
        END
        AS T148ALERTAVENCASS,
        CASE
          WHEN T148COMPARTILHAEMAIL = 'S' THEN '<i className="fas fa-check text-success"></i>' 
          ELSE '<i className="fas fa-times text-danger"></i>'  
        END
        AS T148COMPARTILHAEMAIL,
        CASE
          WHEN T148MPARTILHAWHATSAPP = 'S' THEN '<i className="fas fa-check text-success"></i>' 
          ELSE '<i className="fas fa-times text-danger"></i>'  
        END
        AS T148MPARTILHAWHATSAPP,
        CASE
          WHEN T148AUDITORIAACESSOS = 'S' THEN '<i className="fas fa-check text-success"></i>' 
          ELSE '<i className="fas fa-times text-danger"></i>'  
        END
        AS T148AUDITORIAACESSOS,
        CASE
          WHEN T148LOGOASSINATURA = 'S' THEN '<i className="fas fa-check text-success"></i>' 
          ELSE '<i className="fas fa-times text-danger"></i>'  
        END
        AS T148LOGOASSINATURA,
        CASE
          WHEN T148ASSINATURAAPI = 'S' THEN '<i className="fas fa-check text-success"></i>' 
          ELSE '<i className="fas fa-times text-danger"></i>'  
        END
        AS T148ASSINATURAAPI,
        CASE
          WHEN T148MIGRACAO = 'S' THEN '<i className="fas fa-check text-success"></i>' 
          ELSE '<i className="fas fa-times text-danger"></i>'  
        END
        AS T148MIGRACAO,
        T148EXTRAASSINATURAS,
        T148EXTRAUSUARIOS,
        T48EXTRAARMAZENAMENTO,
        T148VALORMENSAL,
        T148VALORSEMESTRAL,
        T148VALORANUAL,
        DATE_FORMAT(T148DATACADASTRO, '%d/%m/%Y') AS T148DATACADASTRO,
        T148STATUS
      FROM T148PLANO 
      WHERE T148TIPO = 1 AND T148STATUS = 'A' AND T148IDFRANQUEADO = 24 
      ORDER BY T148ORDEM ASC
      `;
      const resposta = await api({
        method: 'post',
        url: '/abresql',
        data: {
          "SQL": sql
        }
      }).then(function (response) {
        return response.data
      }).catch(function (error) {
        console.log(error)
        return false
      });
      setListaDePlanos(
        <>
          {
            [].map.call(resposta, function (item) {
              let marginTopDestaque = 0;
              let shadow = 'shadow';
              let borderDestaque = 'border-azul-escuro';
              let roundedTitulo = '';
              if (item.T148DESTAQUE == 'N') {
                marginTopDestaque = 4;
                shadow = 'shadow-sm';
                borderDestaque = '';
                roundedTitulo = 'rounded';
              }
              let btnContratarTexto = '';
              if (item.T148PLANOGRATUITO == 'S') {
                btnContratarTexto = 'Experimentar grátis'
              } else {
                btnContratarTexto = 'Contratar';
              }
              return (
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 mt-2" key={item.T148ID}>
                  <div className={`${shadow}} rounded bg-light mt-2 mt-${marginTopDestaque} ${borderDestaque}`}>
                    <h5 className={`text-center bg-azul text-white pt-3 pb-3 ${roundedTitulo}`}>
                      {item.T148DESCRICAO}
                    </h5>
                    <div className="p-3">
                      <h1 className="text-center text-azul-escuro">
                        <Small>R$</Small> {item.T148VALORMENSAL.toFixed(2).replace('.', ',')}<Small>/mês</Small>
                      </h1>
                      <hr />
                      <h5 className="text-center text-azul-escuro">
                        VANTAGENS DO PLANO
                      </h5>
                      <hr />
                      <div className="text-center">
                        <strong>ATÉ {item.T148ASSINATURAS} ASSINATURAS</strong>
                      </div>
                      <div className="text-center">
                        <strong>{item.T148USUARIOS} USUÁRIOS</strong>
                      </div>
                      <div className="text-center">
                        <strong>{item.T148ARMAZENAMENTO} GB DE ARMAZENAMENTO</strong>
                      </div>
                      <div className="d-flex bd-highlight">
                        <div className="p-2 bd-highlight">
                          <i className="fas fa-check text-success"></i>
                        </div>
                        <div className="p-2 flex-grow-1 bd-highlight">
                          Assinatura digital com validade jurídica
                        </div>
                      </div>
                      <div className="d-flex bd-highlight">
                        <div className="p-2 bd-highlight">
                          <i className="fas fa-check text-success"></i>
                        </div>
                        <div className="p-2 flex-grow-1 bd-highlight">
                          Rubrica do signatário no relatório de assinaturas
                        </div>
                      </div>
                      <div className="d-flex bd-highlight">
                        <div className="p-2 bd-highlight">
                          <i className="fas fa-check text-success"></i>
                        </div>
                        <div className="p-2 flex-grow-1 bd-highlight">
                          Validação de assinatura (token) por e-mail, SMS ou WhatsApp
                        </div>
                      </div>
                      <div className="d-flex bd-highlight">
                        <div className="p-2 bd-highlight">
                          <i className="fas fa-check text-success"></i>
                        </div>
                        <div className="p-2 flex-grow-1 bd-highlight">
                          Assinatura em qualquer plataforma (web, mobile);
                        </div>
                      </div>
                      <div className="d-flex bd-highlight">
                        <div className="p-2 bd-highlight">
                          <i className="fas fa-check text-success"></i>
                        </div>
                        <div className="p-2 flex-grow-1 bd-highlight">
                          Alerta de vencimento de prazo do documento
                        </div>
                      </div>
                      <div className="d-flex bd-highlight">
                        <div className="p-2 bd-highlight">
                          <i className="fas fa-check text-success"></i>
                        </div>
                        <div className="p-2 flex-grow-1 bd-highlight">
                          Compartilhamento do documento por e-mail e Whasapp
                        </div>
                      </div>
                      <div className="d-flex bd-highlight">
                        <div className="p-2 bd-highlight">
                          <i className="fas fa-check text-success"></i>
                        </div>
                        <div className="p-2 flex-grow-1 bd-highlight">
                          Auditoria de acessos e movimentações no sistema
                        </div>
                      </div>
                      <div className="d-flex bd-highlight">
                        <div className="p-2 bd-highlight">
                          <i className="fas fa-times text-danger"></i>
                        </div>
                        <div className="p-2 flex-grow-1 bd-highlight">
                          O logo da sua empresa nas solicitações de assinaturas
                        </div>
                      </div>
                      <div className="d-flex bd-highlight">
                        <div className="p-2 bd-highlight">
                          <i className="fas fa-times text-danger"></i>
                        </div>
                        <div className="p-2 flex-grow-1 bd-highlight">
                          Assinatura via API
                        </div>
                      </div>
                      <div className="d-flex bd-highlight">
                        <div className="p-2 bd-highlight">
                          <i className="fas fa-times text-danger"></i>
                        </div>
                        <div className="p-2 flex-grow-1 bd-highlight">
                          Migração de base de dados ou sistemas legados
                        </div>
                      </div>
                    </div>
                    <div className="text-center pt-2 pb-4">
                      <Link href={'/selecione-um-plano/1'}>
                        <BtnContrate className="rounded" onClick={
                          () => {
                            localStorage.setItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado', JSON.stringify(item));
                          }
                        } href="/selecione-um-plano/">
                          {btnContratarTexto}
                        </BtnContrate>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </>
      )
      console.log(`resposta: ${resposta}`)
    }
    listarPlanos();
  }, []);

  return (
    <Template>
      <H1 className="p-2 mt-3 bg-light text-azul-escuro">
        Nossos Planos
      </H1>
      <div className="container">
        <div className="row justify-content-center">
          {listaDePlanos}
        </div>
      </div>
    </Template >
  )
}

const H1 = styled.h3`
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
  text-align: center;
`;

const Small = styled.small`
font-size: 17px;
`;


const BtnContrate = styled.a`
text-decoration: none;
background-color: #6CA6CB;
color: white;
border: none;
padding: 10px 30px;
box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
font-size: 17px;
&:hover {
  background-color: #2980b9;
  transition: .5s;
  text-decoration: none;
  color: #fff;
}
`;

