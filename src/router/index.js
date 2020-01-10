import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


//头部和底部
import Head from "@/components/content/head"
//首页
import Index from '@/view/home/index'
//中心概况
import Centre from '@/view/centre'
//机构人员
import Personnel from '@/view/personnel'
import InstitutionalSettings from '@/view/personnel/institutionalSettings'
import Researcher from '@/view/personnel/researcher'
import PersonnelInfo from '@/view/personnel/personnelInfo'

//行业动态
import Dynamics from '@/view/dynamics/index'
import IndustryInformation from '@/view/dynamics/industryInformation'
import CentralNews from '@/view/dynamics/centralNews'
import CaseTracking from '@/view/dynamics/caseTracking'
import NewsDetail from '@/view/dynamics/newsDetail'

//研究成果
import AcademicPapers from '@/view/researchFindings/academicPapers'
import ResearchFindings from '@/view/researchFindings/index'
import DetailsResults from '@/view/researchFindings/detailsResults'

//社会服务
import SocialServices from '@/view/socialServices/index'
import SndustryTraining from '@/view/socialServices/industryTraining'
import DetailsServices from '@/view/socialServices/detailsServices'

//学术资源
import AcademicResources from '@/view/academicResources/index'
import IndustryGuidelines from '@/view/academicResources/industryGuidelines'
import DetailsResources from '@/view/academicResources/detailsResources'

//法律法规
import LawsRegulations from '@/view/lawsRegulations/index'
import Nationallaws from '@/view/lawsRegulations/nationallaws'
import LegalDetails from '@/view/lawsRegulations/legalDetails'

//管理页面
import AdminLogin from '@/view/administration/login'
import AdminIndex from '@/view/administration/index'
//文章管理
import Article from '@/view/administration/article/index'
//机构管理
import Organizational from '@/view/administration/organizational/index'
import listInstitutions from '@/view/administration/organizational/listInstitutions'

var routes=    [
  {path: '/', redirect: '/home'},
  {
    path: '/home',
    component: Head,
    children: [{
      path: '/home',
      component: Index,
    }]
  },
  {
    path: '/centre',
    component: Head,
    children: [{
      path: '/centre',
      component: Centre,
    }]
  },
  {
    path: '/personnel',
    component: Head,
    children: [
      {
        path: '/personnel',
        component: Personnel,
        children: [
          {
            path: '',
            redirect: 'index'
          },
          {
            path: 'index',
            component: InstitutionalSettings,
          },
          {
            path: 'researcher',
            component: Researcher,
          },
          {
            path: 'personnelInfo',
            component: PersonnelInfo,
          }
        ]
      },

    ]
  },
  {
    path: '/dynamics',
    component: Head,
    children: [
      {
        path: '/dynamics',
        component: Dynamics,
        children: [
          {
            path: '',
            redirect: 'index'
          },
          {
            path: 'index',
            component: IndustryInformation,
          },
          {
            path: 'centralNews',
            component: CentralNews,
          },
          {
            path: 'caseTracking',
            component: CaseTracking,
          },
          {
            path: 'newsDetail',
            component: NewsDetail,
          },
        ]
      },
    ]
  },
  {
    path: '/researchFindings',
    component: Head,
    children: [
      {
        path: '/researchFindings',
        component: ResearchFindings,
        children: [
          {
            path: '',
            redirect: 'index'
          },
          {
            path: 'index',
            component: AcademicPapers,
          },
          {
            path: 'detailsResults',
            component: DetailsResults,
          },
        ]
      },
    ]
  },
  {
    path: '/socialServices',
    component: Head,
    children: [
      {
        path: '/socialServices',
        component: SocialServices,
        children: [
          {
            path: '',
            redirect: 'index'
          },
          {
            path: 'index',
            component: SndustryTraining,
          },
          {
            path: 'detailsServices',
            component: DetailsServices,
          },
        ]
      },

    ]
  },
  {
    path: '/academicResources',
    component: Head,
    children: [
      {
        path: '/academicResources',
        component: AcademicResources,
        children: [
          {
            path: '',
            redirect: 'index'
          },
          {
            path: 'index',
            component: IndustryGuidelines,
          },
          {
            path: 'detailsResources',
            component: DetailsResources,
          },
        ]
      },

    ]
  },
  {
    path: '/lawsRegulations',
    component: Head,
    children: [
      {
        path: '/lawsRegulations',
        component: LawsRegulations,
        children: [
          {
            path: '',
            redirect: 'index'
          },
          {
            path: 'index',
            component: Nationallaws,
          },
          {
            path: 'legalDetails',
            component: LegalDetails,
          },
        ]
      },
    ]
  },
  {
    path: '/adminLogin',
    component: AdminLogin
  },
  {
    path: '/adminIndex',
    component: AdminIndex,
    children: [
      {
        path: '',
        redirect: 'article'
      },
      {
        path: 'article',
        component: Article,
      },
      {
        path: 'organizational',
        component: Organizational,
      },
      {
        path: 'listInstitutions',
        component: listInstitutions,
      }
    ]
  }
]



var Routes = new Router({
  routes:routes
})
const originalPush = Router.prototype.push
Routes.afterEach((to, from) => {
  history.pushState(null, null, window.location.href.split('#')[0]+'#'+to.path);
})
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default Routes
