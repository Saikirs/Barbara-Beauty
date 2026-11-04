import { LandingPage, RegisterPage, LoginPage, BookingPage, PaymentPage, RecoverPage, NotFoundPage } from '../pages/StudioPages';
const routeConfig = [
 {path:'/',element:<LandingPage/>},
 {path:'/cadastrar',element:<RegisterPage/>}, {path:'/cadastro',element:<RegisterPage/>},
 {path:'/entrar',element:<LoginPage/>}, {path:'/login',element:<LoginPage/>},
 {path:'/agendar',element:<BookingPage/>}, {path:'/pagamento',element:<PaymentPage/>},
 {path:'/recuperar-senha',element:<RecoverPage/>}, {path:'*',element:<NotFoundPage/>}
];
export { routeConfig };
