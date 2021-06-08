import React from 'react';
import styled from 'styled-components';
import { Template } from '../../components/template/index'
import { api } from '../../services/api';
import InputMask from 'react-input-mask';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import { retornandoSomenteInteiro, validandoListaDadosVazia } from './../../lib/validacaoDadosForm';
export default function Home() {
  const [mensagem, setMensagem] = React.useState(<></>);
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

  const [numeroCartaoCredito, setNumeroCartaoCredito] = React.useState('0000 0000 0000 0000');
  const [nomeCartaoCredito, setnomeCartaoCredito] = React.useState('Seu nome');
  const [dataVencimentoCartaoCredito, setdataVencimentoCartaoCredito] = React.useState('02/2025');
  const [codigoSegurancaCartaoCredito, setcodigoSegurancaCartaoCredito] = React.useState('000');

  const etapa1 = React.useRef(null);
  const etapa2 = React.useRef(null);
  const etapa3 = React.useRef(null);
  const etapa4 = React.useRef(null);
  const btnEtapa1 = React.useRef(null);
  const btnEtapa2 = React.useRef(null);
  const btnEtapa3 = React.useRef(null);
  const [gerandoCadastro1, setGerandoCadastro1] = React.useState(
    <div class="spinner-border text-azul" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  );
  const [gerandoCadastro2, setGerandoCadastro2] = React.useState(
    <div class="spinner-border text-azul" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  );
  const [gerandoCadastro3, setGerandoCadastro3] = React.useState(
    <div class="spinner-border text-azul" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  );
  const [gerandoCadastro4, setGerandoCadastro4] = React.useState(
    <div class="spinner-border text-azul" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  );
  const [session, loading] = useSession()
  // 
  const useRefNome = React.useRef(null);
  const useRefDoc = React.useRef(null);
  const useRefCelular = React.useRef(null);
  const useRefEmail = React.useRef(null);

  const proximaEtapa = async (etapa) => {
    let planoSelecionado = [];
    if (localStorage.getItem('planoSelecionado')) {
      planoSelecionado = JSON.parse(localStorage.getItem('planoSelecionado'));
    }
    if (etapa == 2) {
      let listaCamposFormulario = [
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
      let verificaCamposVazios = validandoListaDadosVazia(listaCamposFormulario)
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
        // btnEtapa1.current.classList.add('bg-light');
        // btnEtapa1.current.classList.add('text-dark');
        btnEtapa2.current.classList.add('bg-azul');
        btnEtapa2.current.classList.add('text-white');
        etapa1.current.classList.add('animate__fadeOutLeft');
        etapa1.current.classList.add('none')
        etapa2.current.classList.remove('none')
        etapa2.current.classList.add('animate__fadeinRight')
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
        }
      }
    } else if (etapa == 3) {
      setMensagem('');
      // btnEtapa2.current.classList.add('bg-light');
      // btnEtapa2.current.classList.add('text-dark');
      btnEtapa3.current.classList.add('bg-azul');
      btnEtapa3.current.classList.add('text-white');
      etapa2.current.classList.add('none');
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
      // let idCliente = await cadastrarCliente();
      let idUsuario = await cadastrarUsuario(150);
      // let permissao = await atribuirPermissaoUsuario(idCliente);
    } else if (etapa == 4) {
      btnEtapa2.current.classList.add('text-azul');
    }
  }

  React.useEffect(() => {
    async function verificandoSessao() {
      const session = await getSession();
      console.log(session);
      /* ... */
    }
    verificandoSessao();
  }, []);

  const cadastrarCliente = async () => {
    let T100CLIENTE = [];
    T100CLIENTE.push({
      "T100NOME": useRefNome.current.value,
      "T100NOMERAZAO": useRefNome.current.value,
      "T100CPFCNPJ": retornandoSomenteInteiro(useRefDoc.current.value),
      "T100TEL1": retornandoSomenteInteiro(useRefCelular.current.value),
      "T100EMAIL": useRefEmail.current.value,
      "T100STATUS": "A",
      "T100IDFRANQUEADO": JSON.parse(localStorage.getItem('planoSelecionado')).T148IDFRANQUEADO
    });
    console.log(JSON.stringify(T100CLIENTE[0]))
    const resposta = await api({
      method: 'post',
      url: '/T100CLIENTE/inclusao',
      data: T100CLIENTE[0]
    }).then(function (response) {
      setGerandoCadastro1(<img src="https://img.icons8.com/cotton/32/000000/checkmark.png" />)
      return response.data.retorno;
    }).catch(function (error) {
      console.log('___error___')
      console.log(error)
      return false
    });
    return resposta
  }

  const cadastrarUsuario = async (idCliente) => {
    let T101USUARIO = {
      "T101CLIENTE": idCliente,
      "T101NOME": useRefNome.current.value,
      "T101CELULAR": retornandoSomenteInteiro(useRefCelular.current.value),
      "T101LOGIN": useRefEmail.current.value,
      "T101EMAIL": useRefEmail.current.value,
      "T101SENHA": "2f3787de753952e07f5a22a1d15015a4",
      "T101STATUSLINK": 0,
      "T101TIPO": "N",
      "T101STATUS": "A",
      "T101IDFRANQUEADO": JSON.parse(localStorage.getItem('planoSelecionado')).T148IDFRANQUEADO
    };

    console.log(JSON.stringify(T101USUARIO));

    const resposta = await api({
      method: 'post',
      url: '/T101USUARIO/inclusao',
      data: T101USUARIO
    }).then(function (response) {
      setGerandoCadastro2(<img src="https://img.icons8.com/cotton/32/000000/checkmark.png" />)
      return response.data.retorno;
    }).catch(function (error) {
      console.log(error)
      return false
    });
    return resposta;
  }

  const atribuirPermissaoUsuario = async (idUsuario) => {
    setGerandoCadastro3(<img src="https://img.icons8.com/cotton/32/000000/checkmark.png" />)
    return true;
  }

  return (
    <Template>
      <div className="container">
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
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 mb-2">
            <div className="shadow-sm rounded p-2 bg-azul text-white">
              <div className="d-flex align-items-center justify-content-center">
                {titulo}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 m-auto animate__animated none" ref={etapa3}>
            <div className="mt-3 shadow-sm rounded">
              <ul class="list-group">
                <li class="list-group-item border-top-0 border-left-0 border-right-0">
                  <div class="d-flex bd-highlight align-items-center">
                    <div class="p-2 bd-highlight">
                      {gerandoCadastro1}
                    </div>
                    <div class="p-2 flex-grow-1 bd-highlight">
                      Cadastrando cliente
                    </div>
                  </div>
                </li>
                <li class="list-group-item border-top-0 border-left-0 border-right-0">
                  <div class="d-flex bd-highlight align-items-center">
                    <div class="p-2 bd-highlight">
                      {gerandoCadastro2}
                    </div>
                    <div class="p-2 flex-grow-1 bd-highlight">
                      Criando usuário
                    </div>
                  </div>
                </li>
                <li class="list-group-item border-top-0 border-left-0 border-right-0">
                  <div class="d-flex bd-highlight align-items-center">
                    <div class="p-2 bd-highlight">
                      {gerandoCadastro3}
                    </div>
                    <div class="p-2 flex-grow-1 bd-highlight">
                      Atribuindo permissões
                    </div>
                  </div>
                </li>
                <li class="list-group-item border-top-0 border-left-0 border-right-0">
                  <div class="d-flex bd-highlight align-items-center">
                    <div class="p-2 bd-highlight">
                      {gerandoCadastro3}
                    </div>
                    <div class="p-2 flex-grow-1 bd-highlight">
                      Liberando acesso
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 m-auto animate__animated none" ref={etapa2}>
            {/* Texto dos termos do contrato */}
            <div className="p-3 mt-3 shadow-sm rounded">
              <div>
                <h3>
                  What is Lorem Ipsum?
                </h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
              <BtnPrimario className="" onClick={() => proximaEtapa(3)}>
                Aceito os Termos
            </BtnPrimario>
            </div>
            <CartaoCreditoFrente className="shadow-sm rounded p-3 mt-3 none">
              <div className="text-center">
                <LogoCartao src="/images/logo.png" />
              </div>
              <img src="https://img.icons8.com/fluent/48/000000/sim-card-chip.png" />
              <NumeroCartao className="p-2">
                {numeroCartaoCredito}
              </NumeroCartao>
              <div className="d-flex bd-highlight">
                <div className="p-2 pt-0 flex-grow-1 bd-highlight">
                  <TitularCartao className>
                    {nomeCartaoCredito}
                  </TitularCartao>
                </div>
                <div className="p-2 pt-0 flex-grow-1 bd-highlight">
                  <ValidadeCartaoCredito className="p-2 bd-highlight">
                    {dataVencimentoCartaoCredito}
                  </ValidadeCartaoCredito>
                </div>
              </div>
            </CartaoCreditoFrente>
            <CartaoCreditoVerso className="shadow-sm rounded mt-3 none">
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
        <div className="row animate__animated" ref={etapa1}>
          {!session && <>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 text-center m-auto">
              <button className="btn btn-light rounded-pill w-100 mt-3" onClick={() => signIn('google')}>
                <img src="https://img.icons8.com/color/24/000000/google-logo.png" /> Login usando conta do Google
            </button>
              <button className="btn btn-light rounded-pill w-100 mt-3" onClick={() => signIn('facebook')}>
                <img src="https://img.icons8.com/color/24/000000/facebook.png" /> Login usando conta do Facebook
            </button>
              <button className="btn btn-light rounded-pill w-100 mt-3" onClick={() => signIn('email')}>
                <img src="https://img.icons8.com/cotton/24/000000/mail-account.png" /> Login usando conta de E-mail
            </button>
            </div>
          </>}
          {session && <>
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 m-auto">
              <div className="shadow-sm rounded p-3 mt-3">
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
                  <div className="input-group mb-2">
                    <div className="input-group-prepend" style={{ width: '45px' }}>
                      <div className="input-group-text">
                        <i className="fas fa-id-card pt-1 pb-1 text-azul-escuro" style={{ fontWeight: 'bold' }}></i>
                      </div>
                    </div>
                    <input type="text" className="form-control" placeholder="CPF | CNPJ" name="T100CPFCNPJ" id="T100CPFCNPJ" defaultValue="10668138688" minLength="11" maxLength="18" ref={useRefDoc} />
                  </div>
                  <label className="sr-only" htmlFor="T100CPFCNPJ">Celular</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend" style={{ width: '45px' }}>
                      <div className="input-group-text">
                        <i className="fab fa-whatsapp pt-1 pb-1 text-azul-escuro" style={{ fontWeight: 'bold' }}></i>
                      </div>
                    </div>
                    <InputMask mask="(99) 9 9999-9999" className="form-control" placeholder="Celular" defaultValue="35998242097" ref={useRefCelular} />
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
&:hover {
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
&:hover {
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
&:hover {
  background-color: #2980b9;
  transition: .5s;
  text-decoration: none;
  color: #fff;
}`;

