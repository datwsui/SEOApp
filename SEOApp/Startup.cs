using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SEOApp.Startup))]
namespace SEOApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
