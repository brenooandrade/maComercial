import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
// import Link from 'next/link';

export const Template = (props) => {
    return (
        <div>
            <Head>
                <title>Contrate - Meu Arquivo</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="./images/nuvem_fin.png" />
                <meta name="description" content="O meu arquivo é uma solução de assinaturas eletrônicas e digitais que armazena seus documentos de forma segura, trazendo mobilidade e segurança para a gestão de documentos." />
                <meta name="author" content="Meu Arquivo Assinatura Digital" />
                <meta name="keywords" content="meuarquivo, meu arquivo, GED, assinatura digital, assinatura eletronica, guardar arquivos, guarda fisica" />
                <meta property="og:title" content="Meu Arquivo" />
                <meta property="og:description" content="O meu arquivo é uma solução de assinaturas eletrônicas e digitais que armazena seus documentos de forma segura, trazendo mobilidade e segurança para a gestão de documentos" />
                <meta property="og:url" content="https://app.meuarquivo.com.br" />
                <meta property="og:site_name" content="Meu Arquivo" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://app.meuarquivo.com.br/assets/images/icone_meuarquivo.jpg" />
                <meta property="og:image:width" content="512" />
                <meta property="og:image:height" content="512" />
                {/* <!-- Twitter --> */}
                <meta name="twitter:title" content="Meu Arquivo" />
                <meta name="twitter:description" content="O meu arquivo é uma solução de assinaturas eletrônicas e digitais que armazena seus documentos de forma segura, trazendo mobilidade e segurança para a gestão de documentos" />
                <meta name="twitter:url" content="https://app.meuarquivo.com.br" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:image" content="https://app.meuarquivo.com.br/assets/images/icone_meuarquivo.jpg" />
                <meta name="twitter:site" content="@meuarquivo" />
                <link href="/css/bootstrap.css" rel="stylesheet" />
                <link href="/css/style.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
                />
            </Head>
            {/* <Cabecario>
                <Image
                    src="/images/logo.png"
                    alt="meuarquivo"
                    width={500}
                    height={500}
                />
            </Cabecario> */}
            <div className="d-flex flex-column bd-highlight justify-content-between" style={{ minHeight: '100vh' }}>
                <div className="bd-highlight">
                    <header className="bg-azul text-center p-2 shadow-sm">
                        <Logo
                            src="/images/logo.png"
                            alt="meuarquivo"
                            className="p-2"
                        />
                    </header>
                    {props.children}
                </div>
                <BtnWhatsapp className="fixed-bottom">
                    <a href="https://wa.me/message/J4DOGGHU4YICO1" target="_blank">
                        <img src="https://img.icons8.com/fluent/48/000000/whatsapp.png" />
                    </a>
                </BtnWhatsapp>
                <Footer className="mt-5 bd-highlight">
                    MEU ARQUIVO | TODOS OS DIREITOS RESERVADOS 2020 | CNPJ: 26.626.475/0001-81
                </Footer>
            </div>
        </div>
    )

}

const Header = styled.header`
    background-color: #6CA6CB;
    text-align: center;
    /* box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important; */
    box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;
    padding: 15px;
 `;


const Footer = styled.footer`
    background-color: #2c3e50;
    color: #fff;
    text-align: center;
    /* box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important; */
    padding: 15px;
 `;

const BtnWhatsapp = styled.div`
    max-width: 96px;
    margin-left: auto;
    margin-bottom: 5%;
    text-align: right;
    padding-right: 10px;
 `;

const Logo = styled.img`
max-width: 100%;
max-height: 96px;
`;