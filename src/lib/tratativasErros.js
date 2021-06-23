export const errorAxiosFrontEnd = (error) => {
    console.log(error)
    try {
        let msgErro = '';
        if (error.response != undefined) {
            if (error.response.hasOwnProperty('data') && error.response.data.hasOwnProperty('message')) {
                return (
                    <div className="alert alert-danger mt-3 shadow-sm">
                        <div className="p-2">
                            <i className="fas fa-bug pr-2"></i>${error.message}
                        </div>
                        <div className="p-2">
                            [RETORNO API]: ${error.response.data.message}
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div className="alert alert-danger mt-3 shadow-sm">
                    <div className="p-2">
                        <i className="fas fa-bug pr-2"></i>${error.message}
                    </div>
                    <div className="p-2">
                        [RETORNO API]: Não há retorno da API
                    </div>
                </div>
            );
        }
    } catch (errorCatch) {
        return (
            <div className="alert alert-danger mt-3 shadow-sm">
                <div className="p-2">
                    <i className="fas fa-bug pr-2"></i>${errorCatch}
                </div>
                <div className="p-2">
                    [RETORNO API]: Não há retorno da API
                </div>
            </div>
        );
    }
}