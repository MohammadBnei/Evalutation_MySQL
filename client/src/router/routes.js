import LoginView from '../view/login';
import RegisterView from '../view/register';
import ArticlesView from '../view/Articles';
import Articles from '../collection/Articles';
import Session from '../model/Session';

var Routes = Backbone.Router.extend({
  routes: {
    login: 'login',
    register: 'register',
    articles: 'articles',
    '*other': 'defaultRoute'
  },
  session: new Session(),
  login () {
    console.log({session: this.session});
    const loginView = new LoginView({
      model: this.session
    });

    loginView.render();
  },
  register () {
    const registerView = new RegisterView({
      model: this.session
    });

    registerView.render();
  },
  articles () {
    const articlesView = new ArticlesView({
      collection: new Articles()
    });

    articlesView.render();
  }
});

export default Routes;
