import React from 'react';
import styled from 'styled-components';
import { Template } from '../../components/template/index'
import { Termos } from '../../components/termos/index'
import { api } from '../../services/api';
import InputMask from 'react-input-mask';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import { retornandoSomenteInteiro, validandoListaDadosVazia } from './../../lib/validacaoDadosForm';
import { errorAxiosFrontEnd } from './../../lib/tratativasErros';
import moment from 'moment';
import { uuid } from 'uuidv4';
import GoogleLogin from 'react-google-login';

export default function Home({ urlAPi, tokenMP, linkRetornoMP, linkDashboard }) {
  const [mensagemErro, setMensagemErro] = React.useState(<></>);
  const [mensagem, setMensagem] = React.useState(<></>);
  const [htmlEtapa2, setHTMLEtapa2] = React.useState(<></>);
  const [tipoLogin, setTipoLogin] = React.useState('');
  const [titulo, setTitulo] = React.useState(
    <>
      <div className="p-2 bd-highlight">
        <img src="https://img.icons8.com/cotton/48/000000/checked-identification-documents.png" />
      </div>
      <div className="p-2 bd-highlight">
        <h5 className="text-center p-0 m-0 mt-2">Identificação</h5>
      </div>
    </>
  );

  // const [numeroCartaoCredito, setNumeroCartaoCredito] = React.useState('0000 0000 0000 0000');
  // const [nomeCartaoCredito, setnomeCartaoCredito] = React.useState('Seu nome');
  // const [mesVencimentoCartaoCredito, setMesVencimentoCartaoCredito] = React.useState('02/2025');
  // const [anoVencimentoCartaoCredito, setAnoVencimentoCartaoCredito] = React.useState('02/2025');
  // const [codigoSegurancaCartaoCredito, setcodigoSegurancaCartaoCredito] = React.useState('000');
  // const [frenteCartao, setFrenteCartao] = React.useState('');
  // const [versoCartao, setVersoCartao] = React.useState(' none');

  const useRefSessaoPagCard = React.useRef(null);
  const etapa1 = React.useRef(null);
  const etapa2 = React.useRef(null);
  const etapa3 = React.useRef(null);
  const etapa4 = React.useRef(null);
  const btnTermosDeUso = React.useRef(null);
  const btnEtapa1 = React.useRef(null);
  const btnEtapa2 = React.useRef(null);
  const btnEtapa3 = React.useRef(null);
  const useRefFinalizado = React.useRef(null);

  const [gerandoCadastro1, setGerandoCadastro1] = React.useState(
    <div className="spinner-border text-azul" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
  const [gerandoCadastro2, setGerandoCadastro2] = React.useState(
    <div className="spinner-border text-azul" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
  const [gerandoCadastro3, setGerandoCadastro3] = React.useState(
    <div className="spinner-border text-azul" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
  const [session, loading] = useSession()
  const etapaEmail = React.useRef(null);
  const useRefNome = React.useRef(null);
  const useRefDoc = React.useRef(null);
  const [divDoc, setDivDoc] = React.useState('');
  const useRefCelular = React.useRef(null);
  const useRefEmail = React.useRef(null);

  const proximaEtapa = async (etapa) => {
    let planoSelecionado = [];
    if (localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')) {
      planoSelecionado = JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado'));
    }
    if (etapa == 1) {
      console.log(divDoc)
      if (JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148PLANOGRATUITO == 'S') {
        setDivDoc('none');
      }
      else {
        setDivDoc('');
      }
      etapa1.current.classList.add('animate__fadeOutLeft');
      etapa1.current.classList.add('none')
      etapa2.current.classList.add('animate__fadeInRight')
      etapa2.current.classList.remove('none')
      etapaEmail.current.classList.remove('none');
    } else if (etapa == 2) {
      const urlParams = new URLSearchParams(window.location.search);
      const idMP = urlParams.get('payment_id');
      let verificaCamposVazios = false;
      let listaCamposFormulario = [];
      if (idMP == null && JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148PLANOGRATUITO == 'N') {
        listaCamposFormulario = [
          {
            'valor': useRefNome.current.value,
            'nome': 'Nome Completo',
            'validacaoDocumento': false
          },
          {
            'valor': useRefDoc.current.value,
            'nome': 'Documento',
            'validacaoDocumento': true
          },
          {
            'valor': useRefCelular.current.value,
            'nome': 'Celular',
            'validacaoDocumento': false
          },
          {
            'valor': useRefEmail.current.value,
            'nome': 'E-mail',
            'validacaoDocumento': false
          }
        ];
        verificaCamposVazios = validandoListaDadosVazia(listaCamposFormulario);
        localStorage.setItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario', JSON.stringify({
          "T100NOME": useRefNome.current.value,
          "T100NOMERAZAO": useRefNome.current.value,
          "T100CPFCNPJ": retornandoSomenteInteiro(useRefDoc.current.value),
          "T100TEL1": retornandoSomenteInteiro(useRefCelular.current.value),
          "T100EMAIL": useRefEmail.current.value,
          "T100STATUS": "A",
          "T100IDFRANQUEADO": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148IDFRANQUEADO
        }));
      }
      if (verificaCamposVazios.status == true && verificaCamposVazios.validacaoDocumento == false) {
        setMensagem(
          <div className="alert alert-warning text-center" role="alert">
            Ops! Campo <strong>{verificaCamposVazios.campo}</strong> é obrigatório.
          </div>
        )
      } else if (verificaCamposVazios.status == true && verificaCamposVazios.validacaoDocumento == true) {
        setMensagem(
          <div className="alert alert-warning text-center" role="alert">
            Ops! Campo <strong>{verificaCamposVazios.campo}</strong> não é valido.
          </div>
        )
      } else {
        setMensagem('');
        let existeCliente = [];
        if ((JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148PLANOGRATUITO == 'S')) {
          let dadosCliente = [];
          if (tipoLogin == 'google') {
            dadosCliente = {
              "T100NOME": session.user.name,
              "T100NOMERAZAO": session.user.name,
              "T100EMAIL": session.user.email,
            };
          } else {
            dadosCliente = {
              "T100NOME": useRefNome.current.value,
              "T100NOMERAZAO": useRefNome.current.value,
              "T100EMAIL": useRefEmail.current.value,
            };
          }
          const session = await getSession();
          existeCliente = await api({
            method: 'post',
            url: urlAPi + '/T100CLIENTE/verifica-se-existe',
            data: dadosCliente
          }).then(function (response) {
            return response.data;
          }).catch(function (error) {
            console.log(error);
            setMensagemErro(errorAxiosFrontEnd(error));
            return false
          });
          if (tipoLogin == 'google') {
            localStorage.setItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario', JSON.stringify({
              "T100NOME": session.user.name,
              "T100NOMERAZAO": session.user.name,
              "T100EMAIL": session.user.email,
              "T100IDFRANQUEADO": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148IDFRANQUEADO
            }));
          } else {
            localStorage.setItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario', JSON.stringify({
              "T100NOME": useRefNome.current.value,
              "T100NOMERAZAO": useRefNome.current.value,
              "T100EMAIL": useRefEmail.current.value,
              "T100IDFRANQUEADO": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148IDFRANQUEADO
            }));
            console.log({
              "T100NOME": useRefNome.current.value,
              "T100NOMERAZAO": useRefNome.current.value,
              "T100EMAIL": useRefEmail.current.value,
              "T100IDFRANQUEADO": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148IDFRANQUEADO
            })
          }
        } else {
          existeCliente = await api({
            method: 'post',
            url: urlAPi + '/T100CLIENTE/verifica-se-existe',
            data: {
              "T100NOMERAZAO": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario')).T100NOMERAZAO,
              "T100CPFCNPJ": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario')).T100CPFCNPJ,
              "T100TEL1": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario')).T100TEL1,
              "T100EMAIL": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario')).T100EMAIL
            }
          }).then(function (response) {
            console.log(response.data)
            return response.data;
          }).catch(function (error) {
            console.log(error);
            setMensagemErro(errorAxiosFrontEnd(error));
            return false
          });
        }

        if (existeCliente.length > 0) {
          setMensagemErro(
            <div className="alert alert-warning mt-3 shadow-sm text-center">
              <i className="fas fa-exclamation-circle pr-2"></i> Ops! Você ja é nosso cliente.
            </div>
          );
        } else {
          setMensagem('');
          // btnEtapa1.current.classList.add('bg-light');
          // btnEtapa1.current.classList.add('text-dark');
          etapaEmail.current.classList.add('none');
          btnEtapa2.current.classList.add('bg-azul');
          btnEtapa2.current.classList.add('text-white');
          etapa1.current.classList.remove('animate__fadeInRight');
          etapa1.current.classList.add('animate__fadeOutLeft');
          etapa1.current.classList.add('none')
          etapa2.current.classList.add('animate__fadeInRight')
          etapa2.current.classList.remove('none')
          if (planoSelecionado.T148PLANOGRATUITO == 'S') {
            setTitulo(
              <>
                <div className="p-2 bd-highlight">
                  <img src="https://img.icons8.com/cotton/48/000000/conclusion-contract.png" />
                </div>
                <div className="p-2 bd-highlight">
                  <h4 className="text-center pt-2">Termos do Contrato</h4>
                </div>
              </>);
            console.log(etapa2.current)
            etapa2.current.classList.add('animate__fadeInRight')
            etapa2.current.classList.remove('none');
            btnTermosDeUso.current.classList.remove('none');
          } else {
            setTitulo(
              <>
                <div className="p-2 bd-highlight">
                  <img src="https://img.icons8.com/cotton/48/000000/card-in-use--v3.png" />
                </div>
                <div className="p-2 bd-highlight">
                  <h4 className="text-center">Pagamento</h4>
                </div>
              </>);
            if (idMP == null) {
              localStorage.setItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario', JSON.stringify({
                "T100NOME": useRefNome.current.value,
                "T100NOMERAZAO": useRefNome.current.value,
                "T100CPFCNPJ": retornandoSomenteInteiro(useRefDoc.current.value),
                "T100TEL1": retornandoSomenteInteiro(useRefCelular.current.value),
                "T100EMAIL": useRefEmail.current.value,
                "T100STATUS": "A",
                "T100IDFRANQUEADO": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148IDFRANQUEADO
              }));
              setHTMLEtapa2(
                <div className="text-center">
                  <div className="spinner-border text-azul mt-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h5>
                    Você será redirecionado para pagina de pagamentos...
                  </h5>
                </div>
              )
              setTimeout(() => {
                efetuarPagamento()
              }, 3000);
            } else if (idMP != null) {
              const respostaMercadoPago = await api({
                method: 'get',
                url: `https://api.mercadopago.com/v1/payments/${idMP}?access_token=${tokenMP}`,
              }).then(function (response) {
                return response.data
              }).catch(function (error) {
                console.log(error);
                setMensagemErro(errorAxiosFrontEnd(error));
                return false
              });
              localStorage.setItem('ac30b237ba7a941f7abcec7f8543e1d7_mercadoPago', JSON.stringify(respostaMercadoPago));
              console.log(JSON.stringify(respostaMercadoPago))
              console.log(respostaMercadoPago.status)
              if (respostaMercadoPago.status == 'approved' || respostaMercadoPago.status == 'pending' && respostaMercadoPago.payment_method_id == 'bolbradesco') {
                setHTMLEtapa2(
                  <div className="shadow-sm mt-2 p-3">
                    <div className="text-center">
                      <img src="https://img.icons8.com/cotton/64/000000/checked--v2.png" className="img-fluid" />
                    </div>
                    <h5 className="text-center mt-3">
                      Parabéns pagamento aprovado com sucesso
                    </h5>
                    {/* <div className="text-end w-100">
                      <BtnAzul className="rounded mt-3 ml-auto" onClick={() => proximaEtapa(3)}>
                        Próxima Etapa
                      </BtnAzul>
                    </div> */}
                  </div>
                );
                btnTermosDeUso.current.classList.remove('none');
              } else {
                setHTMLEtapa2(
                  <div className="shadow-sm mt-2 p-3">
                    <div className="text-center">
                      <img src="https://img.icons8.com/cotton/64/000000/error--v3.png" className="img-fluid" />
                    </div>
                    <h5 className="text-center mt-3">
                      Ops! Pagamento falhou.
                    </h5>
                    <div className="text-center w-100">
                      <BtnAzul className="rounded mt-3 ml-auto" onClick={() => efetuarPagamento()}>
                        Tentar novamente
                      </BtnAzul>
                    </div>
                  </div>
                );
              }
            }
          }
        }
      }
    } else if (etapa == 3) {
      setMensagem('');
      btnEtapa3.current.classList.add('bg-azul');
      btnEtapa3.current.classList.add('text-white');
      etapa2.current.classList.remove('animate__fadeInRight');
      etapa2.current.classList.add('animate__fadeOutLeft');
      etapa2.current.classList.add('none')
      etapa3.current.classList.add('animate__fadeinRight')
      etapa3.current.classList.remove('none')
      // btnEtapa3.current.classList.add('bg-azul');
      // btnEtapa3.current.classList.add('text-white');
      setTitulo(
        <>
          <div className="p-2 bd-highlight">
            <img src="https://img.icons8.com/cotton/48/000000/checklist--v1.png" />
          </div>
          <div className="p-2 bd-highlight">
            <h4 className="text-center">Gerando Cadastro</h4>
          </div>
        </>);
      etapa3.current.classList.remove('none');
      let idCliente = await cadastrarCliente();
      if (idCliente != undefined && idCliente != false) {
        let vigencia = await cadastrarVigencia(idCliente);
        let idUsuario = await cadastrarUsuario(idCliente);
        if (idUsuario != undefined && idUsuario != false) {
          let permissao = await atribuirPermissaoUsuario(idUsuario);
          console.log(`permissao: ${JSON.stringify(permissao)}`);
          if (permissao != undefined && permissao != false) {
            atribuirPermissaoUsuario();
            proximaEtapa(4);
          }
        }
      }
    } else if (etapa == 4) {
      useRefFinalizado.current.focus();
      etapa4.current.classList.remove('none')
      useRefFinalizado.current.classList.add('animate__animated')
      useRefFinalizado.current.classList.add('animate__zoomIn')
      useRefFinalizado.current.classList.remove('none')
    }
  }

  React.useEffect(() => {
    async function verificandoSessao() {
      const session = await getSession();
      let etapaAtual = window.location.pathname.replace('/selecione-um-plano/', '');
      let diaAtual = moment().format('Y-M-D').toString();
      let diaFim = moment(diaAtual, 'Y-M-D').add('days', JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148PERIODOTESTE).format('Y-M-D').toString();
      if (etapaAtual == 2) {
        console.log('aqui')
        proximaEtapa(2);
      }
      else if (session && JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148PLANOGRATUITO == 'S') {
        proximaEtapa(2);
      }
    }
    verificandoSessao();
  }, []);

  const cadastrarCliente = async () => {
    const resposta = await api({
      method: 'post',
      url: urlAPi + '/T100CLIENTE/inclusao',
      data: JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario'))
    }).then(function (response) {
      setGerandoCadastro1(<img src="https://img.icons8.com/cotton/32/000000/checkmark.png" />);
      return response.data.retorno;
    }).catch(function (error) {
      console.log('___error___')
      console.log(error)
      setMensagemErro(errorAxiosFrontEnd(error));
      return false
    });
    return resposta
  }

  const cadastrarVigencia = async (idCliente) => {
    if (1 == 1) {
      let T145VIGENCIACOB = [];
      let T145INICIO = moment().format('Y-M-D').toString();
      let T145FIM = moment(T145INICIO, 'Y-M-D').add('months', 12).format('Y-M-D').toString();
      T145VIGENCIACOB.push({
        "T145PLANO": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148ID,
        "T145IDCONTRATANTE": idCliente,
        "T145INICIO": T145INICIO,
        "T145FIM": T145FIM,
        "T145TIPORECORRENCIA": "M",
        "T145EXTRAASSINATURAS": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148EXTRAASSINATURAS,
        "T145EXTRAUSUARIOS": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148EXTRAUSUARIOS,
        "T45EXTRAARMAZENAMENTO": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T48EXTRAARMAZENAMENTO,
        "T145VALOR": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148VALORMENSAL
      });
      let resposta = await api({
        method: 'post',
        url: urlAPi + '/T145VIGENCIACOB/inclusao',
        data: T145VIGENCIACOB
      }).then(function (response) {
        return response.data.retorno;
      }).catch(function (error) {
        console.log(error)
        setMensagemErro(errorAxiosFrontEnd(error));
        return false
      });
      let T146PARCELA = [];
      let dataAtual = moment().format('Y-M-D');
      let mercadoPago = JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_mercadoPago'));
      for (let index = 1; index < 13; index++) {
        if (index == 1 && JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148PLANOGRATUITO == 'N') {
          if (mercadoPago.status == 'approved') {
            T146PARCELA.push({
              "T146UUID": uuid(),
              "T146CLIENTE": idCliente,
              "T146CONTRATO": resposta,
              "T146FORMAPAGAMENTO": mercadoPago.payment_type_id,
              "T146IDPAGAMENTO": mercadoPago.id,
              "T146NUMERO": index,
              "T146VALTAXA": mercadoPago.fee_details[0].amount,
              "T146VALORPARCELA": mercadoPago.transaction_amount,
              "T146DATAPAGAMENTO": dataAtual,
              "T146DATAVENCIMENTO": dataAtual,
              "T146DATACADASTRO": dataAtual,
              "T146STATUS": "A"
            });
          } else {
            T146PARCELA.push({
              "T146UUID": uuid(),
              "T146CLIENTE": idCliente,
              "T146CONTRATO": resposta,
              "T146FORMAPAGAMENTO": mercadoPago.payment_type_id,
              "T146IDPAGAMENTO": mercadoPago.id,
              "T146NUMERO": index,
              "T146VALTAXA": 0,
              "T146VALORPARCELA": mercadoPago.transaction_amount,
              "T146DATAPAGAMENTO": dataAtual,
              "T146DATAVENCIMENTO": dataAtual,
              "T146DATACADASTRO": dataAtual,
              "T146STATUS": "A"
            });
          }
        } else {
          let addMes = index - 1;
          let T146DATAVENCIMENTO = moment(dataAtual, 'Y-M-D').add(addMes, 'months').format('Y-M-D').toString();
          T146PARCELA.push({
            "T146UUID": uuid(),
            "T146CLIENTE": idCliente,
            "T146CONTRATO": resposta,
            "T146NUMERO": index,
            "T146VALORPARCELA": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148VALORMENSAL,
            "T146DATAVENCIMENTO": T146DATAVENCIMENTO,
            "T146DATACADASTRO": moment().format('Y-M-D'),
            "T146STATUS": "P"
          });
        }
      }
      if (resposta != false) {
        resposta = await api({
          method: 'post',
          url: urlAPi + '/T146PARCELA/inclusao',
          data: T146PARCELA
        }).then(function (response) {
          return response.data.retorno;
        }).catch(function (error) {
          console.log(error)
          setMensagemErro(errorAxiosFrontEnd(error));
          return false
        });
      }
      return resposta;
    } else {
      console.log('erroooooooooor');
      console.log(JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148PLANOGRATUITO)
    }
  }

  const cadastrarUsuario = async (idCliente) => {
    let T101USUARIO = [];
    if ((JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148PLANOGRATUITO == 'S')) {
      T101USUARIO = {
        "T101CLIENTE": idCliente,
        "T101NOME": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario')).T100NOME,
        "T101LOGIN": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario')).T100EMAIL,
        "T101EMAIL": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario')).T100EMAIL,
        "T101SENHA": "2f3787de753952e07f5a22a1d15015a4",
        "T101STATUSLINK": 3,
        "T101TIPO": "N",
        "T101STATUS": "A",
        "T101IDFRANQUEADO": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148IDFRANQUEADO
      };
    } else {
      T101USUARIO = {
        "T101CLIENTE": idCliente,
        "T101NOME": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario')).T100NOME,
        "T101CELULAR": retornandoSomenteInteiro(JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario')).T100TEL1),
        "T101LOGIN": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario')).T100EMAIL,
        "T101EMAIL": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_dadosUsuario')).T100EMAIL,
        "T101SENHA": "2f3787de753952e07f5a22a1d15015a4",
        "T101STATUSLINK": 2,
        "T101TIPO": "N",
        "T101STATUS": "A",
        "T101IDFRANQUEADO": JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado')).T148IDFRANQUEADO
      };
    }

    const resposta = await api({
      method: 'post',
      url: urlAPi + '/T101USUARIO/inclusao',
      data: T101USUARIO
    }).then(function (response) {
      setGerandoCadastro2(<img src="https://img.icons8.com/cotton/32/000000/checkmark.png" />)
      return response.data.retorno;
    }).catch(function (error) {
      console.log(error)
      setMensagemErro(errorAxiosFrontEnd(error));
      return false
    });
    return resposta;
  }

  const atribuirPermissaoUsuario = async (idUsuario) => {
    const resposta = await api({
      method: 'get',
      url: urlAPi + '/usuario/atribuir-permissao/' + idUsuario
    }).then(function (response) {
      setGerandoCadastro3(<img src="https://img.icons8.com/cotton/32/000000/checkmark.png" />);
      return response.data.status;
    }).catch(function (error) {
      console.log(error)
      setMensagemErro(errorAxiosFrontEnd(error));
      return false
    });
    return true;
  }

  const showSessaoCard = () => {
    let classes = useRefSessaoPagCard.current.classList['value'];
    console.log('pesquisa: ' + classes.search('none'));
    useRefSessaoPagCard.current.classList.toggle('none');
  }

  const validarCartaoCredito = () => {
    console.log(`validando...`);
  }

  const efetuarPagamento = async () => {
    let plano = JSON.parse(localStorage.getItem('ac30b237ba7a941f7abcec7f8543e1d7_planoSelecionado'))
    let resposta = await api({
      method: 'post',
      url: urlAPi + '/pagamento/validacao',
      data: {
        "title": plano.T148DESCRICAO,
        "unit_price": parseFloat(plano.T148VALORMENSAL),
        "link": linkRetornoMP
      }
    }).then(function (response) {
      return response.data;
    }).catch(function (error) {
      console.log(error);
      setMensagemErro(errorAxiosFrontEnd(error));
      return false
    });
    if (resposta.init_point != undefined) {
      // window.location.href = (resposta.sandbox_init_point);
      window.location.href = (resposta.init_point);
    }

  }

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <Template>
      <div className="container">
        {/* Barra de Progresso */}
        <div className="d-flex flex-row bd-highlight justify-content-center align-items-center mt-5 mb-3">
          <div className="bd-highlight text-center">
            <BtnEtapa className="btn rounded-circle" ref={btnEtapa1}>
              1
            </BtnEtapa>
          </div>
          <div className="bd-highlight text-center">
            <Border />
          </div>
          <div className="bd-highlight text-center">
            <BtnLite className="btn rounded-circle" ref={btnEtapa2}>
              2
            </BtnLite>
          </div>
          <div className="bd-highlight text-center">
            <Border />
          </div>
          <div className="bd-highlight text-center">
            <BtnLite className="btn rounded-circle" ref={btnEtapa3}>
              3
            </BtnLite>
          </div>
        </div>
        {/* Mensagem Final */}
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 mb-2">
            <div className="shadow-sm rounded p-2 bg-azul text-white">
              <div className="d-flex align-items-center justify-content-center">
                {titulo}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 mb-2">
            <div>
              {mensagemErro}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 m-auto animate__animated none" ref={etapa3}>
            <div className="mt-3 shadow-sm rounded">
              <ul className="list-group">
                <li className="list-group-item border-top-0 border-left-0 border-right-0 none" ref={etapa4}>
                  <div className="none" ref={useRefFinalizado}>
                    <div className="text-center">
                      <img src="https://img.icons8.com/cotton/128/000000/checkmark.png" style={{ maxWidth: '100%' }} />
                    </div>
                    <h3 className="text-center">
                      Parabéns!
                    </h3>
                    <h5 className="text-center">
                      Cadastro Realizado com sucesso.
                    </h5>
                    <div className="text-center">
                      <a href={linkDashboard}>
                        <BtnPrimario>
                          <i className="fas fa-external-link-alt"></i> Acessar o Dashboard
                        </BtnPrimario>
                      </a>
                    </div>
                  </div>
                </li>
                <li className="list-group-item border-top-0 border-left-0 border-right-0">
                  <div className="d-flex bd-highlight align-items-center animate__animated animate__fadeIn">
                    <div className="p-2 bd-highlight">
                      {gerandoCadastro1}
                    </div>
                    <div className="p-2 flex-grow-1 bd-highlight">
                      Cadastrando cliente
                    </div>
                  </div>
                </li>
                <li className="list-group-item border-top-0 border-left-0 border-right-0">
                  <div className="d-flex bd-highlight align-items-center animate__animated animate__fadeIn">
                    <div className="p-2 bd-highlight">
                      {gerandoCadastro2}
                    </div>
                    <div className="p-2 flex-grow-1 bd-highlight">
                      Criando usuário
                    </div>
                  </div>
                </li>
                <li className="list-group-item border-top-0 border-left-0 border-right-0">
                  <div className="d-flex bd-highlight align-items-center animate__animated animate__fadeIn">
                    <div className="p-2 bd-highlight">
                      {gerandoCadastro3}
                    </div>
                    <div className="p-2 flex-grow-1 bd-highlight">
                      Atribuindo permissões
                    </div>
                  </div>
                </li>
                <li className="list-group-item border-top-0 border-left-0 border-right-0">
                  <div className="d-flex bd-highlight align-items-center animate__animated animate__fadeIn">
                    <div className="p-2 bd-highlight">
                      {gerandoCadastro3}
                    </div>
                    <div className="p-2 flex-grow-1 bd-highlight">
                      Liberando acesso
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 m-auto animate__animated none" ref={etapa2}>
            {htmlEtapa2}
            {/* Texto dos termos do contrato */}
            <div className="p-3 mt-3 shadow-sm rounded none" ref={btnTermosDeUso}>
              <Termos />
              <BtnPrimario className="" onClick={() => proximaEtapa(3)}>
                Aceito os Termos
              </BtnPrimario>
            </div>
            {/* <div className="d-flex bd-highlight justify-content-center">
                <div className="p-2 bd-highlight">
                  <BtnAzul className="rounded" onClick={() => showSessaoCard()}>
                    <i className="fas fa-money-check"></i>&nbsp;&nbsp;Cartão de Crédito
                  </BtnAzul>
                </div>
                <div className="p-2 bd-highlight">
                  <BtnAzul className="rounded" onClick={() => efetuarPagamento()}>
                    Mercado Pago
                  </BtnAzul>
                </div>
              </div> */}
            {/* <div className="animate__animated animate__fadeIn none" ref={useRefSessaoPagCard}>
              <div className="shadow-sm p-3 rounded">
                <div className="d-flex flex-row bd-highlight  justify-content-center flex-wrap">
                  <div className="p-2 bd-highlight">
                    <CartaoCreditoFrente className={"shadow-sm rounded p-3" + frenteCartao}>
                      <div className="text-center">
                        <LogoCartao src="/images/logo.png" />
                      </div>
                      <img src="https://img.icons8.com/fluent/48/000000/sim-card-chip.png" />
                      <NumeroCartao className="p-2">
                        {numeroCartaoCredito} {frenteCartao}
                      </NumeroCartao>
                      <div className="d-flex bd-highlight">
                        <div className="p-2 pt-0 flex-grow-1 bd-highlight">
                          <TitularCartao className>
                            {nomeCartaoCredito}
                          </TitularCartao>
                        </div>
                        <div className="p-2 pt-0 flex-grow-1 bd-highlight">
                          <ValidadeCartaoCredito className="p-2 bd-highlight">
                            {mesVencimentoCartaoCredito}/{anoVencimentoCartaoCredito}
                          </ValidadeCartaoCredito>
                        </div>
                      </div>
                    </CartaoCreditoFrente>
                  </div>
                  <div className="p-2 bd-highlight">
                    <CartaoCreditoVerso className={"shadow-sm rounded" + versoCartao}>
                      <FaxaCinza class />
                      <div className="d-flex bd-highlight p-3">
                        <div className="pt-0 flex-grow-1 bd-highlight">
                          <NumeroCartaoVerso>
                            Número <br />
                            {numeroCartaoCredito}
                          </NumeroCartaoVerso>
                        </div>
                        <div className="p-2 pt-0 flex-grow-1 bd-highlight text-right">
                          <CodigoSegurancaCartao className="bd-highlight">
                            CVC
                            <br />
                            {codigoSegurancaCartaoCredito}
                          </CodigoSegurancaCartao>
                        </div>
                      </div>
                    </CartaoCreditoVerso>
                  </div>
                </div>
                <form id="form-checkout">
                  <div className="row mt-3">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 m-auto">
                      <div className="mb-3">
                        <label className="form-label">Número do Cartão de Crédito</label>
                        <input
                          name="cardNumber"
                          id="form-checkout__cardNumber"
                          type="number"
                          className="form-control"
                          placeholder="Número do Cartão"
                          onClick={() => {
                            setFrenteCartao('');
                          }}
                          onChange={(evt) => {
                            console.log(evt.target.value.toString())
                            let numeros = evt.target.value.toString()
                            console.log(numeros.length)
                            if (evt.target.value.length < 17)
                              setNumeroCartaoCredito(evt.target.value)
                          }}
                          maxLength={"16"}
                          max={16} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Nome Completo</label>
                        <input
                          name="cardholderName"
                          id="form-checkout__cardholderName"
                          type="text"
                          className="form-control"
                          placeholder="Nome impresso no cartão"
                          onClick={() => {
                            setnomeCartaoCredito('');
                          }}
                          value={nomeCartaoCredito}
                          onChange={(evt) => setnomeCartaoCredito(evt.target.value.toString())}
                          maxLength="30" />
                        <div className="mt-1 bg-warning rounded w-100 text-center">
                          <small className="">
                            Nome deve ser o impresso no cartão
                          </small>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Data de Validade</label>
                        <input
                          name="cardExpirationMonth" id="form-checkout__cardExpirationMonth"
                          type="text"
                          maxLength="2"
                          className="form-control"
                          placeholder="Mês de validade"
                          value={mesVencimentoCartaoCredito}
                          onChange={(evt) => setMesVencimentoCartaoCredito(evt.target.value.toString())}
                        />
                        <input
                          name="cardExpirationYear" id="form-checkout__cardExpirationYear"
                          type="text"
                          maxLength="2"
                          className="form-control"
                          placeholder="Ano de validade"
                          value={anoVencimentoCartaoCredito}
                          onChange={(evt) => setAnoVencimentoCartaoCredito(evt.target.value.toString())}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Código de Segurança</label>
                        <input
                          name="securityCode"
                          id="form-checkout__securityCode"
                          className="form-control"
                          value={codigoSegurancaCartaoCredito}
                          onClick={() => {
                            setFrenteCartao(' none');
                            setcodigoSegurancaCartaoCredito('');
                            setVersoCartao('');
                          }}
                          onChange={(evt) => {
                            setFrenteCartao(' none');
                            setcodigoSegurancaCartaoCredito('');
                            setVersoCartao('');
                            let codigo = evt.target.value.toString();
                            if (evt.target.value.toString().length <= 3) {
                              setcodigoSegurancaCartaoCredito(evt.target.value.toString());
                            }
                            if (codigo.length == 3) {
                              setTimeout(() => {
                                setVersoCartao(' none');
                                setFrenteCartao('');
                              }, 1000);
                            }
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          name="cardholderEmail"
                          id="form-checkout__cardholderEmail"
                          type="email"
                          maxLength="2"
                          className="form-control"
                          placeholder="E-mail"
                          value={() => useRefEmail.current.value}
                        />
                      </div>
                      <div className="mb-3">
                        <select name="issuer" id="form-checkout__issuer" className="form-control"></select>
                      </div>
                      <div className="mb-3">
                        <select name="identificationType" id="form-checkout__identificationType"></select>
                      </div>
                      <div className="mb-3">
                        <input type="text" name="identificationNumber" id="form-checkout__identificationNumber" />
                      </div>
                      <div className="mb-3">
                        <input type="text" name="identificationNumber" id="form-checkout__identificationNumber" />
                      </div>
                      <div className="mb-3">
                        <select name="installments" id="form-checkout__installments"></select>
                      </div>
                      <BtnAzul type="submit" id="form-checkout__submit" className="rounded">
                        Pagar
                      </BtnAzul>
                    </div>
                  </div>
                </form>
              </div>
            </div> */}
          </div>
        </div>
        <div className="row none" ref={etapaEmail}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 m-auto">
            <div className="shadow-sm rounded p-3 mt-3 animate__animated animate__fadeInLeft">
              <h5 className="text-center bg-light p-2 pt-3 rounded cursorPointer">
                <img src="https://img.icons8.com/cotton/35/000000/add-male-user--v2.png" />Login
              </h5>
              {mensagem}
              <div>
                <label className="sr-only" htmlFor="T100NOME">Nome</label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend" style={{ width: '45px' }}>
                    <div className="input-group-text">
                      <i className="fas fa-user pt-1 pb-1 text-azul-escuro"></i>
                    </div>
                  </div>
                  <input type="text" className="form-control" name="T100NOME" id="T100NOME" placeholder="Nome" ref={useRefNome} />
                </div>
                <div className={divDoc}>
                  <label className="sr-only" htmlFor="T100CPFCNPJ">CPF ou CNPJ</label>
                  <div className={"input-group"}>
                    <div className="input-group-prepend" style={{ width: '45px' }}>
                      <div className="input-group-text">
                        <i className="fas fa-id-card pt-1 pb-1 text-azul-escuro" style={{ fontWeight: 'bold' }}></i>
                      </div>
                    </div>
                    <input type="text" className="form-control" placeholder="CPF | CNPJ" name="T100CPFCNPJ" id="T100CPFCNPJ" minLength="11" maxLength="18" ref={useRefDoc} />
                  </div>
                  <div className="form-text rounded bg-light w-100 text-dark p-1 text-center mb-1">
                    <small id="emailHelp" className="">Somente números do documento</small>
                  </div>
                </div>
                <label className="sr-only" htmlFor="T100CPFCNPJ">Celular</label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend" style={{ width: '45px' }}>
                    <div className="input-group-text">
                      <i className="fab fa-whatsapp pt-1 pb-1 text-azul-escuro" style={{ fontWeight: 'bold' }}></i>
                    </div>
                  </div>
                  <InputMask mask="(99) 9 9999-9999" className="form-control" placeholder="Celular" ref={useRefCelular} />
                </div>
                <label className="sr-only" htmlFor="T100CPFCNPJ">E-mail</label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend" style={{ width: '45px' }}>
                    <div className="input-group-text">
                      <i className="fas fa-at pt-1 pb-1 text-azul-escuro"></i>
                    </div>
                  </div>
                  <input type="email" className="form-control" id="email" placeholder="E-mail" ref={useRefEmail} />
                </div>
                {/* <label className="sr-only" htmlFor="T100CPFCNPJ">Senha</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend" style={{ width: '45px' }}>
                      <div className="input-group-text">
                        <i className="fas fa-key pt-1 pb-1 text-azul-escuro"></i>
                      </div>
                    </div>
                    <input type="password" className="form-control" id="senha" placeholder="Senha" ref={useRefSenha} />
                  </div> */}
                <BtnPrimario className="btn mt-1" onClick={() => proximaEtapa(2)}>
                  Próxima Etapa
                </BtnPrimario>
              </div>
            </div>
          </div>
        </div>
        <div className="row animate__animated" ref={etapa1}>
          {!session && <>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 text-center m-auto">
              {/* <button className="btn btn-light rounded-pill w-100 mt-3"
                onClick={
                  () => {
                    signIn('google');
                    setTipoLogin('google')
                  }
                }>
                <img src="https://img.icons8.com/color/24/000000/google-logo.png" /> Login usando conta do Google
              </button> */}
              <GoogleLogin
                clientId="831675781995-d31i79siojummmaor0mdcg2evh2i40ec.apps.googleusercontent.com"
                buttonText="Login com Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'} 
                className="rounded-pill shadow-none bg-light"
                style={{
                  borderRadius: 10
                }}
              />
              {/* <button className="btn btn-light rounded-pill w-100 mt-3" onClick={() => signIn('facebook')}>
                <img src="https://img.icons8.com/color/24/000000/facebook.png" /> Login usando conta do Facebook
              </button> */}
              <button className="btn btn-light rounded-pill w-100 mt-3"
                onClick={
                  () => {
                    proximaEtapa(1);
                    setTipoLogin('email');
                  }
                }>
                <img src="https://img.icons8.com/cotton/24/000000/mail-account.png" /> Login usando conta de E-mail
              </button>
            </div>
          </>}
          {session && <>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 m-auto">
              <div className="shadow-sm rounded p-3 mt-3 animate__animated animate__fadeInLeft">
                <h5 className="text-center bg-light p-2 pt-3 rounded cursorPointer">
                  <img src="https://img.icons8.com/cotton/35/000000/add-male-user--v2.png" />Login
                </h5>
                <div className="text-center">
                  <img src={session.user.image} className="rounded-circle mt-2 mb-2" style={{ maxHeight: '96px' }} />
                </div>
                {mensagem}
                <div>
                  <label className="sr-only" htmlFor="T100NOME">Nome</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend" style={{ width: '45px' }}>
                      <div className="input-group-text">
                        <i className="fas fa-user pt-1 pb-1 text-azul-escuro"></i>
                      </div>
                    </div>
                    <input type="text" className="form-control" name="T100NOME" id="T100NOME" placeholder="Nome" defaultValue={session.user.name} ref={useRefNome} />
                  </div>
                  <label className="sr-only" htmlFor="T100CPFCNPJ">CPF ou CNPJ</label>
                  <div className="input-group">
                    <div className="input-group-prepend" style={{ width: '45px' }}>
                      <div className="input-group-text">
                        <i className="fas fa-id-card pt-1 pb-1 text-azul-escuro" style={{ fontWeight: 'bold' }}></i>
                      </div>
                    </div>
                    <input type="text" className="form-control" placeholder="CPF | CNPJ" name="T100CPFCNPJ" id="T100CPFCNPJ" minLength="11" maxLength="18" ref={useRefDoc} />
                  </div>
                  <div className="form-text rounded bg-light w-100 text-dark p-1 text-center mb-1">
                    <small id="emailHelp" className="">Somente números do documento</small>
                  </div>
                  <label className="sr-only" htmlFor="T100CPFCNPJ">Celular</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend" style={{ width: '45px' }}>
                      <div className="input-group-text">
                        <i className="fab fa-whatsapp pt-1 pb-1 text-azul-escuro" style={{ fontWeight: 'bold' }}></i>
                      </div>
                    </div>
                    <InputMask mask="(99) 9 9999-9999" className="form-control" placeholder="Celular" ref={useRefCelular} />
                  </div>
                  <label className="sr-only" htmlFor="T100CPFCNPJ">E-mail</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend" style={{ width: '45px' }}>
                      <div className="input-group-text">
                        <i className="fas fa-at pt-1 pb-1 text-azul-escuro"></i>
                      </div>
                    </div>
                    <input type="email" className="form-control" id="email" placeholder="E-mail" defaultValue={session.user.email} ref={useRefEmail} />
                  </div>
                  {/* <label className="sr-only" htmlFor="T100CPFCNPJ">Senha</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend" style={{ width: '45px' }}>
                      <div className="input-group-text">
                        <i className="fas fa-key pt-1 pb-1 text-azul-escuro"></i>
                      </div>
                    </div>
                    <input type="password" className="form-control" id="senha" placeholder="Senha" ref={useRefSenha} />
                  </div> */}
                  <BtnPrimario className="btn mt-1" onClick={() => proximaEtapa(2)}>
                    Próxima Etapa
                  </BtnPrimario>
                </div>
              </div>
            </div>
          </>}
        </div>
      </div>
    </Template >
  )
}

export async function getServerSideProps(context) {
  console.log('aqui: ')
  console.log('urlAPi' + process.env.API);
  console.log('tokenMP' + process.env.TOKENMP);
  console.log('linkRetornoMP' + process.env.LINKRETORNOMP);
  console.log('linkDashboard' + process.env.LINKDASHBOARD);
  return {
    props: {
      urlAPi: process.env.API,
      tokenMP: process.env.TOKENMP,
      linkRetornoMP: process.env.LINKRETORNOMP,
      linkDashboard: process.env.LINKDASHBOARD,
    }, // will be passed to the page component as props
  }
}
const DisplayNone = styled.div`
      display: none!important;
      `;

const CartaoCreditoVerso = styled.div`
      display: block;
      width: 400px;
      height: 200px;
      margin: auto;
      background-color: #2980b9;
      color: #fff;
      padding: 10px 0px;
      `;

const FaxaCinza = styled.div`
      background-color: #2c3e50;
      width: 100%;
      height: 50px;
      margin-top: 20px;
      margin-bottom: 20px;
      display: block;
      `;

const NumeroCartaoVerso = styled.div`
      font-size: 17px;
      font-family: 'cc font', monospace;
      `;

const CodigoSegurancaCartao = styled.div`
      font-size: 17px;
      font-family: 'cc font', monospace;
      text-align: right;
      `;

const CartaoCreditoFrente = styled.div`
      width: 400px;
      height: 200px;
      margin: auto;
      background-color: #2980b9;
      color: #fff;
      `;

const LogoCartao = styled.img`
      height: 48px;
      margin: auto;
      `;

const NumeroCartao = styled.div`
      font-size: 22px;
      font-family: 'cc font', monospace;
      word-spacing: 30px;
      `;

const TitularCartao = styled.div`
      font-size: 20px;
      font-family: 'cc font', monospace;
      `;

const ValidadeCartaoCredito = styled.div`
      font-size: 20px;
      font-family: 'cc font', monospace;
      text-align: right;
      `;

const Border = styled.div`
      border-top: 2px solid #6CA6CB;
      box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
      height: 2px;
      min-width: 100px;
      display: block;
      `;

const BtnEtapa = styled.button`
      background-color: #6CA6CB;
      color: white;
      border: none;
      padding: 10px 20px;
      box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
      font-size: 19px;
      &&:hover {
        background-color: #2980b9;
      color: white;
      transition: .5s;
}`;

const BtnLite = styled.button`
      background-color: #f8f9fa;
      color: #343a40;
      border: none;
      padding: 10px 20px;
      box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
      font-size: 19px;
      &&:hover {
        background-color: #2980b9;
      color: white;
      transition: .5s;
}`;

const BtnPrimario = styled.button`
      text-decoration: none;
      background-color: #6CA6CB;
      color: white;
      border: none;
      padding: .375rem .75rem;
      box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
      font-size: 17px;
      border-radius: .25rem;
      &&:hover {
        background-color: #2980b9;
      transition: .5s;
      text-decoration: none;
      color: #fff;
}`;

const BtnAzul = styled.button`
      display: block;
      display: inline;
      text-decoration: none;
      background-color: #6CA6CB;
      color: white;
      border: none;
      padding: 7px 15px;
      box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
      font-size: 17px;
      &&:hover {
        background-color: #2980b9;
      transition: .5s;
      text-decoration: none;
      color: #fff;
}
      `;





