import React from 'react';
import styled from 'styled-components';
// import Link from 'next/link';

export const Termos = (props) => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center shadow-sm rounded bg-light">
                <div className="p-2 bd-highlight">
                    <img src="https://img.icons8.com/cotton/48/000000/conclusion-contract.png" />
                </div>
                <div className="p-2 bd-highlight">
                    <h3 className="text-center pt-2">Aceite os Termos do Contrato</h3>
                </div>
            </div>
            <div className="mt-3">
                <h5 className="bg-light rounded p-2 pt-3 pb-3 text-azul text-center shadow-sm">
                    ACESSO AO SOFTWARE E EXECUCAÇÃO DOS SERVIÇOS
                </h5>
                <p>1 – O software, objeto desse CONTRATO, é utilizado na modalidade SaaS (Software as a Service) e seu acesso é realizado, exclusivamente, através de endereço eletrônico. O software encontra-se instalado e opera em ambiente de Cloud Computing em provedor de serviço e Data Center AWS – Amazon Web Services Center.</p>
                <p>2 – A CONTRATADA é a única proprietária e detentora de todos os direitos de propriedade intelectual do software, objeto desse contrato, por ela desenvolvido, e cujos direitos de comercialização lhe pertencem única e exclusivamente.</p>
                <p>3 – A infraestrutura para acesso ao software, tais como, dispositivos eletrônicos, sistema operacional e conexão à internet são de responsabilidade exclusiva do CONTRATANTE, devendo, este, providenciar os meios necessários adequados para tal.</p>
                <p>4 – O CONTRATANTE receberá um acesso “master” de administrador, a fim de que possa cadastrar os usuários do software, assim entendidos como seus funcionários e colaboradores, os quais terão permissão de acesso a plataforma MEU ARQUIVO. O login e senha são de uso pessoal e intransferível, devendo, o CONTRATANTE, cuidar do sigilo e segurança.</p>
                <p>5 – A CONTRATADA realizará a implantação e o treinamento remotamente, sendo a implantação realizada no banco de dados do MEU ARQUIVO e será disponibilizado acesso aos usuários da CONTRATANTE através do endereço: https://app.meuarquivo.com.br</p>
                <p>6 – A instalação e o treinamento remoto estão inclusos nos serviços contratados e a CONTRATANTE pode solicitar sua execução presencial a qualquer momento, durante a vigência do contrato, com pelo menos 48 (quarenta e oito) horas de antecedência, sendo que as despesas de deslocamento, alimentação e hospedagem (se houver) ficarão a cargo da CONTRATANTE.</p>
                <p>7 – Fica a cargo da CONTRATADA os custos com a equipe técnica (mão de obra), para que a realização da instalação do sistema e treinamento sejam realizadas “in loco”.</p>
                <p>8 – As solicitações deverão ser feitas através do e-mail suporte@meuarquivo.com.br ou através do telefone/WhatsApp: (35) 3425-0718 / (35) 98871-1272 de segunda a sexta feira das 08h às 18h.</p>
                <h5 className="bg-light rounded p-2 pt-3 pb-3 text-azul text-center shadow-sm">
                    SUPORTE TECNICO
                </h5>
                <p>1 – A CONTRATADA prestará serviços de Suporte Técnico remoto, somente ao CONTRATANTE, das 8h às 18h (horário de Brasília), de segunda às sextas-feiras, exceto em feriados, visando diagnosticar e solucionar eventuais não conformidades do Software, bem como o esclarecimento de dúvidas relativas ao seu uso.</p>
                <p>2 – As solicitações poderão ser realizadas através das seguintes vias:</p>
                <ul>
                    <li>Telefone: (35) 3425-0718</li>
                    <li>WhatsApp: (35) 9 8871-1272</li>
                    <li>E-mail: suporte@meuarquivo.com.br</li>
                </ul>
                <p>3 – O CONTRATANTE é responsável pela disponibilização de software de acesso remoto ao seu hardware quando se fizer necessário algum suporte técnico ou manutenção por parte da contratada.</p>
                <p>4 – O suporte técnico da CONTRATADA classificam os incidentes (chamados) de acordo com os graus de severidade abaixo definidos para o adequado atendimento:</p>
                <ol>
                    <li>Urgente: Não conformidade em funcionalidades essenciais acarretando impedimento parcial ou total do uso do software, sem alternativa de contorno;</li>
                    <li>Alta: Software opera em situação de extrema lentidão;</li>
                    <li>Normal: Não conformidade em funcionalidade não essencial;</li>
                    <li>Baixa: Problemas que não geram impacto aos negócios, que não exijam ajuste de curto prazo, ou em casos de sugestão de melhoria.</li>
                </ol>
                <h5 className="bg-light rounded p-2 pt-3 pb-3 text-azul text-center shadow-sm">
                    ATUALIZAÇÕES DO SOFTWARE
                </h5>
                <p>1 – O CONTRATANTE reconhece, desde já, que o software poderá sofrer atualizações devido às correções de não conformidades, melhorias, adaptações legislativas, dentre outras. Em se tratando de software disponibilizado na modalidade SaaS, as atualizações serão informadas através do website específico: https://meuarquivo.com.br/versoes e, automaticamente serão disponibilizadas no software, bastando ao CONTRATANTE, acessá-lo normalmente sem a necessidade de qualquer procedimento de atualização de versão por este.</p>
                <p>Após a atualização de versão, pela CONTRATADA, não será possível o acesso às versões anteriores do software.</p>
                <p>1.1 – As atualizações serão realizadas sempre na última versão do software e, preferencialmente, fora do horário comercial, porém, eventualmente, poderão ocorrer durante o expediente comercial, em caso de urgência e prévia comunicação ao CONTRATANTE, pela CONTRATADA.</p>
                <p>2 – Os serviços que acarretem desenvolvimento de software, tais como integrações, customizações e migração de dados, serão tratados como projeto e conduzidos por um gerente de projetos. A CONTRATADA apresentará aditivo contratual o qual especificará o escopo, o esforço em horas e o prazo, e o submeterá à aprovação do CONTRATANTE.</p>
                <p>3 – As partes acordam, desde já, que qualquer desenvolvimento solicitado pelo CONTRATANTE passará a integrar o software, estando disponíveis para todos os clientes da CONTRATADA, não sendo dada qualquer exclusividade de utilização ao CONTRATANTE, salvo condições expressas e acordadas entre as partes.</p>
                <h5 className="bg-light rounded p-2 pt-3 pb-3 text-azul text-center shadow-sm">
                    SIGILO, CONFIDENCIALIDADE E PROTEÇÃO DE DADOS PESSOAIS (LGPD)
                </h5>
                <p>1 – CONSIDERANDO a publicação da Lei n° 13.709, de 14 de agosto de 2018 – “Lei Geral de Proteção de Dados Pessoais – LGPD”, que dispõe sobre o tratamento de dados pessoais, inclusive nos meios digitais, por pessoa natural ou por pessoa jurídica e direito público ou privado, com o objetivo de proteger os direitos fundamentais de liberdade e de privacidade e o livre desenvolvimento da personalidade da pessoa natural, têm assim justo e acertado:</p>
                <p>1.1 – A CONTRATADA obriga-se a manter toda e qualquer informação fornecida pela CONTRATANTE, que venha a ter acesso por força deste ou de qualquer outro contrato firmado entre as partes, em absoluto sigilo e confidencialidade, sob pena de incorrer em multa contratual, sem prejuízo de perdas, danos e lucros cessantes, permanecendo ainda a CONTRATADA sujeita a todas as penalidades nos âmbitos Civil, Administrativo, e/ou Criminal, de forma direta ou indireta, decorrente a quebra desta disposição.</p>
                <p>1.2 – As partes se obrigam a tratar e manter como propriedade confidencial e a não utilizar nem revelar a terceiros, durante a vigência deste contrato e após 03 (três) anos do seu término, quaisquer técnicas, projetos, testes, dados, contratos, informações acerca da produção e mercado ou quaisquer outras informações de qualquer natureza que lhe tenham sido reveladas pela outra parte.</p>
                <p>1.3 – Este contrato não poderá ser cedido ou transferido a terceiros sem autorização prévia e por escrito da outra parte.                                                                                          </p>
                <p>1.4 – As partes se obrigam no desenvolvimento das atividades relacionadas com a execução do CONTRATO celebrado, no estrito e rigoroso cumprimento da Lei, cumprir rigorosamente o regime legal da proteção de dados pessoais (LGPD), considerando sigilosas as informações do negócio, comerciais, financeiras, organizacionais, técnicas, estratégicas, metodológicas que as partes venham a ter acesso, bem como aos meios de desenvolvimento de sistemas, preços e condições de comercialização dos serviços e sistemas, prospecção de clientes, informações referentes aos planos de produtos, projetos, custos e nome de produtos, finanças, planos de marketing, oportunidade de negócios, pesquisas, desenvolvimento de “know-how”,</p>
                <p>bem como qualquer outra informação designada como “confidencial” ou “prioritária” relacionada às partes.</p>
                <p>2 – O software é fornecido através de “site seguro” com protocolo SSL (Secure Sockets Layer) e TLS (Transport Layer Security), que são tecnologias de segurança utilizadoras de criptografia de até 256 bits com chave RSA de 2048 bits para confidencialidade e integridade do tráfego de dados entre o aplicativo cliente, browser, API e servidores de base de dados.</p>
                <p>3 – A CONTRATADA hospeda seu software, seus documentos e dados no provedor de serviço de Cloud Computing e Data Center AWS – Amazon Web Services, o qual adota padrões de segurança da informação certificadas pela norma ISO 27001, dentre outras.</p>
                <p>4 – O software possui mecanismos de autenticação de acesso que asseguram a individualização do responsável pelas operações no sistema, sendo possível realizar a auditoria de todas as movimentações realizadas por usuários autorizados a terem acesso as operações de inclusão, consultas, alterações e exclusões no software.</p>
                <p>5 – A base de dados poderá ser acessada pela CONTRATANTE para, por exemplo, responder eventuais dúvidas, atuar em não-conformidade, garantir a segurança do CONTRATANTE, para cumprimento de ordem legal ou judicial e para exercer direitos em âmbito judicial ou administrativo.  </p>
                <h5 className="bg-light rounded p-2 pt-3 pb-3 text-azul text-center shadow-sm">
                    DAS OBRIGAÇÕES DA CONTRATANTE
                </h5>
                <p>1 – O(A) CONTRATANTE terá direito a pleno uso da plataforma MEU ARQUIVO a partir da instalação, obrigando-se:</p>
                <p>1.1 – O CONTRATANTE se obriga a utilizar o software de forma ética e para fins lícitos, de acordo com a legislação vigente, reconhecendo, desde já, que é a única integralmente responsável pelos dados inseridos no software, inclusive por seus funcionários e colaboradores.</p>
                <p>1.2 – Designar tantos operadores quantos julgue necessário a fim de serem treinados pelo técnico (Art. 14 / Lei 8.078/90) no ato da instalação, sem quaisquer custos adicionais, evocando-o a qualquer tempo para novo treinamento, condicionando-se, neste caso, a agendamento prévio.</p>
                <p>1.3 – Pagar pontualmente à CONTRATADA o preço ajustado pela prestação dos serviços, mediante a apresentação, pela CONTRATADA, da respectiva NFSe.</p>
                <p>1.4 – Fornecer dados, informações, equipamentos e acesso remoto, sempre que necessários para o adequado suporte técnico por parte da CONTRATADA.</p>
                <p>1.5 – Defender e fazer os direitos de propriedade da CONTRATADA sobre o objeto do serviço prestado e da plataforma MEU ARQUIVO.</p>
                <p>1.6 – Notificar, incontinenti, a CONTRATADA sobre qualquer violação, por terceiros, dos direitos de propriedade sobre o objeto deste contrato.</p>
                <p>1.7 – Disponibilizar todos os recursos necessários para a execução dos serviços propostos, zelar e manter o correto funcionamento das máquinas, componentes, aplicativos e hardwares utilizados para execução dos serviços objeto deste contrato.</p>
                <h5 className="bg-light rounded p-2 pt-3 pb-3 text-azul text-center shadow-sm">
                    DAS OBRIGAÇÕES DA CONTRATADA
                </h5>
                <p>1 – Constituem obrigações da CONTRATADA:</p>
                <p>1.1 – A CONTRATADA deverá executar os serviços através de profissionais idôneos, em número suficiente, aptos e capazes tecnicamente, segundo os padrões de qualidade e eficiência exigidos, para realização das necessidades dos serviços ora prestados, no prazo acordado.</p>
                <p>1.2 – Atender as normas gerais e regulamentos internos da CONTRANTE, orientando seus profissionais a manter postura adequada, principalmente quanto à apresentação pessoal, comportamento e interface com o local de trabalho.</p>
                <p>1.3 – Manter confidencialidade quanto a natureza do serviço prestado ou a prestar, bem como em relação ao banco de dados a que tiver acesso.</p>
                <p>1.4 – Cumprir, durante a execução dos serviços, todas as leis e regulamentos federais, estaduais ou municipais vigentes, bem como providenciar a obtenção das licenças, alvarás e autorizações necessárias a regular a prestação dos serviços de que ora se trata, sendo a única responsável pelas perdas e danos diretos decorrentes de infrações a que houver dado causa.</p>
                <p>1.5 – Garantir o correto funcionamento, operacionalidade e estabilidade da plataforma MEU ARQUIVO, bem como responsabilizar-se por quaisquer eventuais perdas ou danos que venham a ser causados à CONTRATANTE em decorrência da operacionalização do software, salvo se comprovada a má utilização dos recursos por parte da CONTRATANTE. </p>
                <p>1.6 – Apresentar, sempre que solicitado pela CONTRATANTE, relatórios dos serviços prestados, dentro dos prazos e padrões estabelecidos pela CONTRATADA.</p>
                <p>1.7 – Fornecer à CONTRATANTE todas e quaisquer instruções e/ou materiais explicativos disponíveis acerca das especificações técnicas e instruções de funcionamento da plataforma MEU ARQUIVO, acompanhados dos devidos treinamentos. </p>
                <p>1.8 – É obrigação da CONTRATADA manter em segurança e sigilo todas as informações e documentos que a CONTRATANTE inserir dentro da plataforma MEU ARQUIVO.</p>

            </div>
        </>
    )
}