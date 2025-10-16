
import Mainpage from './components/Mainpage.vue';
import Investment from './components/Investmentpage.vue';
import LoginView from './components/LoginView.vue';
import RegtrationView from './components/RegtrationView.vue';
import Investmentdetials from './components/Investmentdetailspage.vue';
import Investmentapply from './components/Investmentapply.vue';
import Research from './components/Researchpage.vue';
//import Event from './components/Eventpage.vue';
import Eventdetails from './components/Eventdetails.vue';
import Manageprotfolipage from './components/Manage_protfolipage.vue';
import Contact from './components/Contactpage.vue';
import Privacy from './components/Privacypolicypage.vue';
import Faq from './components/Faqpage.vue';
import Trems from './components/Tremspage.vue';
import Consent_view from './components/Consent_view.vue';
import Withdrawal_constent from './components/Withdrawal.vue';
import Disclosure from './components/Disclosure.vue';
import Aboutus from './components/Aboutuspage.vue';
import Investor from './components/RegtrationViewstep2.vue';
import Singpass_type from './components/RegtrationViewstep2_1.vue';
import Personinfo from './components/RegtrationViewstep3.vue';
import Personinfoconfirm from './components/RegtrationViewstep4.vue';
import Thanks from './components/Thankspage.vue';
import Myativepage from './components/MyActivepage.vue';
import Manageprofile from './components/Manage_profile.vue';
import Userdoc from './components/Mydocument.vue';
import TwosetpAuth from './components/RegistrationVerfiyauth.vue';
import Confirmtwosetpauth from './components/Registration_phone_sucess.vue';
import Gosingpass from './components/Singpass.vue';
import Unblocking from './components/Unblocking.vue';
import BasicInfromation from './components/BasicInformation.vue';
import Residentialaddress from './components/Residentialaddress.vue';
import Financial from './components/Financial.vue';
import Declaration from './components/Declaration.vue';
import Forgetpassword from './components/Forgetpassword.vue';
import Subscriptiondetials from './components/Subscriptiondetails.vue';
import Subscription_form from './components/Subscription_form.vue';
import Subcriptiondelartion from './components/Subcriptiondelartion.vue';
import PaymentSub from './components/PaymentSub.vue';
import PageNotFound from './components/PageNotFound.vue';

export default [
    {path: '/', name: 'home', component: Mainpage},
    {path: '/investment', name: 'investment', component: Investment},
    {path: '/investment/details/:id', name: 'investment_details', component: Investmentdetials},
    {path: '/investment/apply/:id', name: 'investment_apply', component: Investmentapply},
    {path: '/login', name: 'login',  component: LoginView}, 
    
    {path: '/registration', name: 'registration',  component: RegtrationView},
    {path: '/investor/:id', name: 'investor_reg',  component: Investor},
    {path: '/checkregistration/:id', name: 'checkregistration_reg',  component: Singpass_type},
    {path: '/personinfo/:id', name: 'investor_personinfo',  component: Personinfo},
    {path: '/confirm', name: 'investor_personinfo_confirm',  component: Personinfoconfirm},
    {path: '/renter', name: 'email_renter',  component: Personinfoconfirm},
    {path: '/resendemail', name: 'resendemail',  component: Personinfoconfirm},
    {path: '/research', name: 'research', component: Research},
   // {path: '/event', name: 'event', component: Event},
    {path: '/event/details/:id', name: 'event_details', component: Eventdetails},
    {path: '/manageportfolio', name: 'manage_protfoli', component: Manageprotfolipage},
    {path: '/contact', name: 'contact', component: Contact},
    {path: '/privacy', name: 'privacy', component: Privacy},
    {path: '/faq', name: 'faq', component: Faq},
    {path: '/trems', name: 'Trems', component: Trems},
    {path: '/disclosure', name: 'Disclosure', component: Disclosure},
    {path: '/aboutus', name: 'aboutus', component: Aboutus},
    {path: '/thanks', name: 'thanks',  component: Thanks}, 

    {path: '/myactive', name: 'myactive',  component: Myativepage}, 
    {path: '/myactive/interest/investment', name: 'interest',  component: Myativepage},
    {path: '/myactive/interest/event', name: 'interest_event',  component: Myativepage},
    {path: '/user/profile', name: 'user_profile',  component: Manageprofile},
    {path: '/user/editemail', name: 'user_edit_email',  component: Manageprofile},
    {path: '/user/editaddress', name: 'user_edit_address',  component: Manageprofile},
    {path: '/user/editnumber', name: 'user_edit_number',  component: Manageprofile},
    {path: '/user/editpassword', name: 'user_edit_password',  component: Manageprofile},
    {path: '/user/doc', name: 'user_doc',  component: Userdoc},
    {path: '/user/subseription', name: 'subseription',  component: Userdoc},
    {path: '/user/subseriptiondetails', name: 'subseriptiondetails',  component: Userdoc},
    {path: '/user/financial', name: 'financial',  component: Userdoc},
    {path: '/user/proof_of_payment', name: 'proof_of_payment',  component: Userdoc},
    {path: '/user/proof_of_residense', name: 'proof_of_residense',  component: Userdoc},
    {path: '/user/digitalsin', name: 'digitalsin',  component: Userdoc},
    {path: '/user/notificationsetting', name: 'notificationsetting',  component: Manageprofile},
    {path: '/user/notification', name: 'notification',  component: Manageprofile},
    {path: '/registration/twosetpauth', name: 'twosetpauth',  component: TwosetpAuth},
    {path: '/registration/twosetpauth/confirm', name: 'twosetpauthconfirm',  component: Confirmtwosetpauth},
    {path: '/registration/singpass', name: 'singpass',  component: Gosingpass},
    {path: '/registration/unblocking', name: 'unblocking',  component: Unblocking},
    {path: '/registration/basicinfo', name: 'basicinfo',  component: BasicInfromation},
    {path: '/registration/address', name: 'residentialaddress',  component: Residentialaddress},
    {path: '/registration/financial', name: 'financial_reg',  component: Financial},
    {path: '/registration/declaration', name: 'declaration',  component: Declaration},
    {path: '/forgetpassword/:type', name: 'forgetpassword',  component: Forgetpassword},
    {path: '/subscriptiondetails/:id/:type?', name: 'subscriptiondetails',  component: Subscriptiondetials},
    {path: '/subscriptionentry/:id?', name: 'subscriptionentry',  component: Subscription_form},
    {path: '/delaration', name: 'subcriptiondelartion',  component: Subcriptiondelartion},
    {path: '/payment/:type?/:paymenttype?', name: 'Payment',  component: PaymentSub},
    {path: '/consent_for_accredited_investor', name: 'Consent_view', component: Consent_view},
    {path: '/withdrawal_of_consent', name: 'Withdrawal_of_consent', component: Withdrawal_constent},
    { path: "/:pathMatch(.*)*", name: 'nopage', component: PageNotFound }
]