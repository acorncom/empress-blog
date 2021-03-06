import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  classNames: ["index-template", "home-template"],
  store: service(),
  blog: service(),

  model(params) {
    // load authors first for ember-data autopopulation
    return this.store.findAll('author').then(() => {
      if(this.blog.paginate) {
        return this.store.query('content', params);
      }

      return this.store.findAll('content');
    })
  },
});
