import { Link } from "react-router-dom";
import {Card} from './Card';

function RouteErrorBoundary(){
    return(
        <div>
            <Card className=''>
                <h1 className=''>Algo deu errado</h1>
                <p className=''>
                    Não foi possivel acessar esta rota. 
                    Tente novamente mais tarde!
                </p>
                <Link to='/' className=''>Voltar para o inicio!</Link>
            </Card>
        </div>
    )
}export {RouteErrorBoundary}