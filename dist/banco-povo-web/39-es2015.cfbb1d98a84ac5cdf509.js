(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{"6bGG":function(l,n,u){"use strict";u.r(n);var e=u("8Y7J");class a{}var t=u("pMnS"),o=u("SVse"),i=u("uPKQ"),r=u("gd7R"),s=u("3r5P"),d=u("+u/R"),c=u("CK/T"),g=u("ApDb"),p=u("RXyF"),m=u("Czxz"),f=u("7LN8"),v=u("s7LF"),b=u("FUeW"),C=u("J96u"),h=u("1arm"),O=u("2lSm"),S=u("33dm"),R=u("5Q26"),V=u("CsZ4"),I=u("DQLy");const y=Object(I.v)("[Visualizacao Margem] Count",Object(I.B)()),A=Object(I.v)("[Visualizacao Margem] Count Sucesso",Object(I.B)()),M=Object(I.v)("[Visualizacao Margem] Count Erro"),_=Object(I.v)("[Visualizacao Margem] Pesquisar",Object(I.B)()),j=Object(I.v)("[Visualizacao Margem] Pesquisar Sucesso",Object(I.B)()),P=Object(I.v)("[Visualizacao Margem] Pesquisar Erro"),T=Object(I.v)("[Visualizacao Margem] Atualizar Situa\xe7\xe3o",Object(I.B)()),k=Object(I.v)("[Visualizacao Margem] Atualizar Situa\xe7\xe3o Sucesso",Object(I.B)());class z{constructor(l){this.store=l,this.situacao=V.a}ngOnInit(){}carregar(l,n){this.id=l,this.novaSituacao=n,this.modal.open()}confirmar(){this.store.dispatch(T({id:this.id,situacao:this.novaSituacao})),this.modal.close()}}var w=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function D(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"label",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Confirma a aprova\xe7\xe3o da solicita\xe7\xe3o para visualiza\xe7\xe3o de margem consign\xe1vel? "]))],null,null)}function N(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"label",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Confirma a reprova\xe7\xe3o da solicita\xe7\xe3o para visualiza\xe7\xe3o de margem consign\xe1vel? "]))],null,null)}function L(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,7,"app-modal-body",[],null,null,null,b.b,b.a)),e["\u0275did"](1,114688,null,0,C.a,[],null,null),(l()(),e["\u0275eld"](2,0,null,0,5,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,4,"div",[["class","col-xl-12"]],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,D)),e["\u0275did"](5,16384,null,0,o.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,N)),e["\u0275did"](7,16384,null,0,o.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var u=n.component;l(n,1,0),l(n,5,0,u.situacao.APROVADO===u.novaSituacao),l(n,7,0,u.situacao.REPROVADO===u.novaSituacao)}),null)}function E(l){return e["\u0275vid"](0,[e["\u0275qud"](671088640,1,{modal:0}),(l()(),e["\u0275eld"](1,0,null,null,14,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],(function(l,n,u){var a=!0,t=l.component;return"submit"===n&&(a=!1!==e["\u0275nov"](l,3).onSubmit(u)&&a),"reset"===n&&(a=!1!==e["\u0275nov"](l,3).onReset()&&a),"ngSubmit"===n&&(a=!1!==t.confirmar()&&a),a}),null,null)),e["\u0275did"](2,16384,null,0,v["\u0275angular_packages_forms_forms_z"],[],null,null),e["\u0275did"](3,4210688,[["margemSituacaoForm",4]],0,v.NgForm,[[8,null],[8,null]],null,{ngSubmit:"ngSubmit"}),e["\u0275prd"](2048,null,v.ControlContainer,null,[v.NgForm]),e["\u0275did"](5,16384,null,0,v.NgControlStatusGroup,[[4,v.ControlContainer]],null,null),(l()(),e["\u0275eld"](6,0,null,null,9,"app-modal",[["id","modalSituacaoMargem"]],null,[[null,"fechar"]],(function(l,n,u){var a=!0;return"fechar"===n&&(a=!1!==e["\u0275nov"](l,3).resetForm()&&a),a}),h.b,h.a)),e["\u0275did"](7,114688,[[1,4],["modal",4]],0,O.a,[],{id:[0,"id"],titulo:[1,"titulo"]},{fechar:"fechar"}),(l()(),e["\u0275and"](16777216,null,0,1,null,L)),e["\u0275did"](9,16384,null,0,o.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275eld"](10,0,null,0,5,"app-modal-footer",[],null,null,null,S.b,S.a)),e["\u0275did"](11,114688,null,0,R.a,[],null,null),(l()(),e["\u0275eld"](12,0,null,0,1,"button",[["class","btn btn-secondary"],["data-dismiss","modal"],["type","button"]],null,[[null,"click"]],(function(l,n,u){var a=!0;return"click"===n&&(a=!1!==e["\u0275nov"](l,3).resetForm()&&a),a}),null,null)),(l()(),e["\u0275ted"](-1,null,["Fechar"])),(l()(),e["\u0275eld"](14,0,null,0,1,"button",[["class","btn btn-primary"],["type","submit"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Salvar"]))],(function(l,n){var u=n.component;l(n,7,0,"modalSituacaoMargem",e["\u0275inlineInterpolate"](1,"",u.id&&u.situacao.APROVADO===u.novaSituacao?"Aprovar Solicita\xe7\xe3o":"Reprovar Solicita\xe7\xe3o","")),l(n,9,0,u.id),l(n,11,0)}),(function(l,n){l(n,1,0,e["\u0275nov"](n,5).ngClassUntouched,e["\u0275nov"](n,5).ngClassTouched,e["\u0275nov"](n,5).ngClassPristine,e["\u0275nov"](n,5).ngClassDirty,e["\u0275nov"](n,5).ngClassValid,e["\u0275nov"](n,5).ngClassInvalid,e["\u0275nov"](n,5).ngClassPending)}))}var F=u("UBOP"),x=u("YrQK");const $=Object(I.w)("visualizacoes-margens"),q=Object(x.a)($),B=Object(x.e)($);var U=u("L6TL");class H extends U.a{constructor(l){super(l),this.store=l,this.situacao=V.a,this.clearTable=()=>{super.resetTable(this.tableMargens)}}ngOnInit(){this.totalRegistros$=this.store.pipe(Object(I.C)(q)),this.registros$=this.store.pipe(Object(I.C)(B)),this.limparFiltro()}ngOnDestroy(){this.store.dispatch(A({filter:void 0,count:0,afterCount:this.clearTable}))}limparFiltro(){this.filtro=new F.a,this.filtro.situacao=V.a.SOLICITADO,this.pesquisar()}pesquisar(){this.store.dispatch(y({filter:Object.assign({},this.filtro),afterCount:this.clearTable}))}loadRegistros(l){const n=super.pageQuery(l),u=super.sortQuery(l);this.store.dispatch(_({page:n,sort:u}))}}var J=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function Q(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,12,"tr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["#"])),(l()(),e["\u0275eld"](3,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Situa\xe7\xe3o"])),(l()(),e["\u0275eld"](5,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Solicitante"])),(l()(),e["\u0275eld"](7,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Consignat\xe1ria"])),(l()(),e["\u0275eld"](9,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Data de Solicita\xe7\xe3o"])),(l()(),e["\u0275eld"](11,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["A\xe7\xf5es"]))],null,null)}function G(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"span",[["class","kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Rejeitado"]))],null,null)}function K(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"span",[["class","kt-badge  kt-badge--success kt-badge--inline kt-badge--pill"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Aprovado"]))],null,null)}function X(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"span",[["class","kt-badge  kt-badge--warning kt-badge--inline kt-badge--pill"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Solicitado"]))],null,null)}function Y(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"a",[["style","margin-right: 10px; color: #ea5252; cursor: pointer;"],["title","Reprovar Solicita\xe7\xe3o"]],null,[[null,"click"]],(function(l,n,u){var a=!0,t=l.component;return"click"===n&&(a=!1!==e["\u0275nov"](l.parent.parent.parent,43).carregar(l.parent.context.$implicit.id,t.situacao.REPROVADO)&&a),a}),null,null)),(l()(),e["\u0275eld"](1,0,null,null,0,"i",[["class","fa fa-times"]],null,null,null,null,null))],null,null)}function Z(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"a",[["style","margin-right: 10px; color: green; cursor: pointer;"],["title","Aprovar Solicita\xe7\xe3o"]],null,[[null,"click"]],(function(l,n,u){var a=!0,t=l.component;return"click"===n&&(a=!1!==e["\u0275nov"](l.parent.parent.parent,43).carregar(l.parent.context.$implicit.id,t.situacao.APROVADO)&&a),a}),null,null)),(l()(),e["\u0275eld"](1,0,null,null,0,"i",[["class","fa fa-check"]],null,null,null,null,null))],null,null)}function W(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,21,"tr",[],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](2,null,["",""])),(l()(),e["\u0275eld"](3,0,null,null,6,"td",[],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,G)),e["\u0275did"](5,16384,null,0,o.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,K)),e["\u0275did"](7,16384,null,0,o.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,X)),e["\u0275did"](9,16384,null,0,o.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275eld"](10,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](11,null,["",""])),(l()(),e["\u0275eld"](12,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](13,null,["",""])),(l()(),e["\u0275eld"](14,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),e["\u0275ted"](15,null,["",""])),e["\u0275ppd"](16,2),(l()(),e["\u0275eld"](17,0,null,null,4,"td",[],null,null,null,null,null)),(l()(),e["\u0275and"](16777216,null,null,1,null,Y)),e["\u0275did"](19,16384,null,0,o.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),e["\u0275and"](16777216,null,null,1,null,Z)),e["\u0275did"](21,16384,null,0,o.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var u=n.component;l(n,5,0,u.situacao.REPROVADO===n.context.$implicit.situacao),l(n,7,0,u.situacao.APROVADO===n.context.$implicit.situacao),l(n,9,0,u.situacao.SOLICITADO===n.context.$implicit.situacao),l(n,19,0,u.situacao.SOLICITADO===n.context.$implicit.situacao),l(n,21,0,u.situacao.SOLICITADO===n.context.$implicit.situacao)}),(function(l,n){l(n,2,0,n.context.rowIndex+1),l(n,11,0,n.context.$implicit.usuarioSolicitante.pessoa.nome),l(n,13,0,n.context.$implicit.empresaConsignataria.pessoa.nomeFantasia);var u=e["\u0275unv"](n,15,0,l(n,16,0,e["\u0275nov"](n.parent.parent,0),n.context.$implicit.dataSolicitacao,"dd/MM/yyyy HH:mm:ss"));l(n,15,0,u)}))}function ll(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,16,"app-card",[],null,null,null,i.b,i.a)),e["\u0275did"](1,114688,null,0,r.a,[],null,null),(l()(),e["\u0275eld"](2,0,null,0,1,"app-card-header",[["titulo","Solicita\xe7\xf5es de consulta"]],null,null,null,s.b,s.a)),e["\u0275did"](3,114688,null,0,d.a,[],{titulo:[0,"titulo"]},null),(l()(),e["\u0275eld"](4,0,null,0,12,"app-card-body",[],null,null,null,c.b,c.a)),e["\u0275did"](5,114688,null,0,g.a,[],null,null),(l()(),e["\u0275eld"](6,0,null,0,10,"p-table",[["styleClass","table-responsive"],["tableStyleClass","table table-striped table-bordered"]],null,[[null,"onLazyLoad"]],(function(l,n,u){var e=!0;return"onLazyLoad"===n&&(e=!1!==l.component.loadRegistros(u)&&e),e}),p.h,p.b)),e["\u0275prd"](512,null,m.TableService,m.TableService,[]),e["\u0275did"](8,5488640,[[1,4],["margensTable",4]],1,m.Table,[e.ElementRef,e.NgZone,m.TableService,e.ChangeDetectorRef],{styleClass:[0,"styleClass"],tableStyleClass:[1,"tableStyleClass"],paginator:[2,"paginator"],rowsPerPageOptions:[3,"rowsPerPageOptions"],lazy:[4,"lazy"],value:[5,"value"],rows:[6,"rows"],totalRecords:[7,"totalRecords"]},{onLazyLoad:"onLazyLoad"}),e["\u0275qud"](603979776,2,{templates:1}),e["\u0275pad"](10,3),e["\u0275pid"](131072,o.AsyncPipe,[e.ChangeDetectorRef]),e["\u0275pid"](131072,o.AsyncPipe,[e.ChangeDetectorRef]),(l()(),e["\u0275and"](0,null,null,1,null,Q)),e["\u0275did"](14,16384,[[2,4]],0,f.PrimeTemplate,[e.TemplateRef],{name:[0,"name"]},null),(l()(),e["\u0275and"](0,null,null,1,null,W)),e["\u0275did"](16,16384,[[2,4]],0,f.PrimeTemplate,[e.TemplateRef],{name:[0,"name"]},null)],(function(l,n){var u=n.component;l(n,1,0),l(n,3,0,"Solicita\xe7\xf5es de consulta"),l(n,5,0);var a=l(n,10,0,5,10,15);l(n,8,0,"table-responsive","table table-striped table-bordered",!0,a,!0,e["\u0275unv"](n,8,5,e["\u0275nov"](n,11).transform(u.registros$)),5,e["\u0275unv"](n,8,7,e["\u0275nov"](n,12).transform(u.totalRegistros$))),l(n,14,0,"header"),l(n,16,0,"body")}),null)}function nl(l){return e["\u0275vid"](0,[e["\u0275pid"](0,o.DatePipe,[e.LOCALE_ID]),e["\u0275qud"](671088640,1,{tableMargens:0}),(l()(),e["\u0275eld"](2,0,null,null,36,"app-card",[],null,null,null,i.b,i.a)),e["\u0275did"](3,114688,null,0,r.a,[],null,null),(l()(),e["\u0275eld"](4,0,null,0,1,"app-card-header",[["titulo","Pesquisar Solicita\xe7\xf5es"]],null,null,null,s.b,s.a)),e["\u0275did"](5,114688,null,0,d.a,[],{titulo:[0,"titulo"]},null),(l()(),e["\u0275eld"](6,0,null,0,32,"form",[["class","kt-form"],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],(function(l,n,u){var a=!0;return"submit"===n&&(a=!1!==e["\u0275nov"](l,8).onSubmit(u)&&a),"reset"===n&&(a=!1!==e["\u0275nov"](l,8).onReset()&&a),a}),null,null)),e["\u0275did"](7,16384,null,0,v["\u0275angular_packages_forms_forms_z"],[],null,null),e["\u0275did"](8,4210688,null,0,v.NgForm,[[8,null],[8,null]],null,null),e["\u0275prd"](2048,null,v.ControlContainer,null,[v.NgForm]),e["\u0275did"](10,16384,null,0,v.NgControlStatusGroup,[[4,v.ControlContainer]],null,null),(l()(),e["\u0275eld"](11,0,null,null,27,"app-card-body",[],null,null,null,c.b,c.a)),e["\u0275did"](12,114688,null,0,g.a,[],null,null),(l()(),e["\u0275eld"](13,0,null,0,25,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](14,0,null,null,24,"div",[["class","form-group col-xl-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](15,0,null,null,1,"label",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Situa\xe7\xe3o:"])),(l()(),e["\u0275eld"](17,0,null,null,21,"div",[["class","input-group"]],null,null,null,null,null)),(l()(),e["\u0275eld"](18,0,null,null,17,"select",[["class","form-control"],["name","status"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"blur"]],(function(l,n,u){var a=!0,t=l.component;return"change"===n&&(a=!1!==e["\u0275nov"](l,19).onChange(u.target.value)&&a),"blur"===n&&(a=!1!==e["\u0275nov"](l,19).onTouched()&&a),"ngModelChange"===n&&(a=!1!==(t.filtro.situacao=u)&&a),a}),null,null)),e["\u0275did"](19,16384,null,0,v.SelectControlValueAccessor,[e.Renderer2,e.ElementRef],null,null),e["\u0275prd"](1024,null,v.NG_VALUE_ACCESSOR,(function(l){return[l]}),[v.SelectControlValueAccessor]),e["\u0275did"](21,671744,null,0,v.NgModel,[[2,v.ControlContainer],[8,null],[8,null],[6,v.NG_VALUE_ACCESSOR]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,v.NgControl,null,[v.NgModel]),e["\u0275did"](23,16384,null,0,v.NgControlStatus,[[4,v.NgControl]],null,null),(l()(),e["\u0275eld"](24,0,null,null,3,"option",[],null,null,null,null,null)),e["\u0275did"](25,147456,null,0,v.NgSelectOption,[e.ElementRef,e.Renderer2,[2,v.SelectControlValueAccessor]],{ngValue:[0,"ngValue"]},null),e["\u0275did"](26,147456,null,0,v["\u0275angular_packages_forms_forms_y"],[e.ElementRef,e.Renderer2,[8,null]],{ngValue:[0,"ngValue"]},null),(l()(),e["\u0275ted"](-1,null,["Solicitado"])),(l()(),e["\u0275eld"](28,0,null,null,3,"option",[],null,null,null,null,null)),e["\u0275did"](29,147456,null,0,v.NgSelectOption,[e.ElementRef,e.Renderer2,[2,v.SelectControlValueAccessor]],{ngValue:[0,"ngValue"]},null),e["\u0275did"](30,147456,null,0,v["\u0275angular_packages_forms_forms_y"],[e.ElementRef,e.Renderer2,[8,null]],{ngValue:[0,"ngValue"]},null),(l()(),e["\u0275ted"](-1,null,["Aprovado"])),(l()(),e["\u0275eld"](32,0,null,null,3,"option",[],null,null,null,null,null)),e["\u0275did"](33,147456,null,0,v.NgSelectOption,[e.ElementRef,e.Renderer2,[2,v.SelectControlValueAccessor]],{ngValue:[0,"ngValue"]},null),e["\u0275did"](34,147456,null,0,v["\u0275angular_packages_forms_forms_y"],[e.ElementRef,e.Renderer2,[8,null]],{ngValue:[0,"ngValue"]},null),(l()(),e["\u0275ted"](-1,null,["Rejeitado"])),(l()(),e["\u0275eld"](36,0,null,null,2,"div",[["class","input-group-append"]],null,null,null,null,null)),(l()(),e["\u0275eld"](37,0,null,null,1,"button",[["class","btn btn-primary"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.pesquisar()&&e),e}),null,null)),(l()(),e["\u0275ted"](-1,null,["Consultar"])),(l()(),e["\u0275and"](16777216,null,null,2,null,ll)),e["\u0275did"](40,16384,null,0,o.NgIf,[e.ViewContainerRef,e.TemplateRef],{ngIf:[0,"ngIf"]},null),e["\u0275pid"](131072,o.AsyncPipe,[e.ChangeDetectorRef]),(l()(),e["\u0275eld"](42,0,null,null,1,"app-visualizacao-margem-situacao",[],null,null,null,E,w)),e["\u0275did"](43,114688,[["visualizacaoMargemSituacao",4]],0,z,[I.o],null,null)],(function(l,n){var u=n.component;l(n,3,0),l(n,5,0,"Pesquisar Solicita\xe7\xf5es"),l(n,12,0),l(n,21,0,"status",u.filtro.situacao),l(n,25,0,u.situacao.SOLICITADO),l(n,26,0,u.situacao.SOLICITADO),l(n,29,0,u.situacao.APROVADO),l(n,30,0,u.situacao.APROVADO),l(n,33,0,u.situacao.REPROVADO),l(n,34,0,u.situacao.REPROVADO),l(n,40,0,e["\u0275unv"](n,40,0,e["\u0275nov"](n,41).transform(u.totalRegistros$))),l(n,43,0)}),(function(l,n){l(n,6,0,e["\u0275nov"](n,10).ngClassUntouched,e["\u0275nov"](n,10).ngClassTouched,e["\u0275nov"](n,10).ngClassPristine,e["\u0275nov"](n,10).ngClassDirty,e["\u0275nov"](n,10).ngClassValid,e["\u0275nov"](n,10).ngClassInvalid,e["\u0275nov"](n,10).ngClassPending),l(n,18,0,e["\u0275nov"](n,23).ngClassUntouched,e["\u0275nov"](n,23).ngClassTouched,e["\u0275nov"](n,23).ngClassPristine,e["\u0275nov"](n,23).ngClassDirty,e["\u0275nov"](n,23).ngClassValid,e["\u0275nov"](n,23).ngClassInvalid,e["\u0275nov"](n,23).ngClassPending)}))}function ul(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"app-visualizacao-margem",[],null,null,null,nl,J)),e["\u0275did"](1,245760,null,0,H,[I.o],null,null)],(function(l,n){l(n,1,0)}),null)}var el=e["\u0275ccf"]("app-visualizacao-margem",H,ul,{},{},[]),al=u("oTug"),tl=u("Wbmx"),ol=u("iInd");class il{}var rl=u("VSng"),sl=u("KB/w"),dl=u("IP0z"),cl=u("/HVE"),gl=u("hOhj"),pl=u("g4HV"),ml=u("nciF"),fl=u("mU/a"),vl=u("lXlb");const bl=Object(vl.a)(),Cl=Object(vl.b)(bl,{}),hl=Object(I.x)(Cl,Object(I.A)(A,(l,{filter:n,count:u})=>Object.assign({},Cl,{filter:n,count:u})),Object(I.A)(M,l=>Object.assign({},Cl)),Object(I.A)(j,(l,{registros:n,page:u,sort:e})=>Object(vl.c)(bl,l,u,e,n)),Object(I.A)(P,l=>Object.assign({},Cl)),Object(I.A)(k,(l,{id:n,situacao:u})=>bl.updateOne({id:n,changes:Object.assign({},l.entities[n],{situacao:u})},l)));function Ol(l,n){return hl(l,n)}bl.getSelectors();var Sl=u("dNIX"),Rl=u("Yml6"),Vl=u("5+tZ"),Il=u("lJxs");class yl extends Sl.a{constructor(l,n,u){super(l,n),this.action$=l,this.store=n,this.margemService=u,this.countVisualizacaoMargem$=super.baseCreateCount(y,A,M),this.countVisualizacaoMargemSucesso$=super.baseCreateCountSuccess(A),this.pesquisarVisualizacaoMargem$=super.baseCreateFind(_,$,j,P),this.atualizarSituacaoVisualizacaoMargem$=Object(Rl.d)(()=>this.action$.pipe(Object(Rl.e)(T),Object(Vl.a)(l=>{const n=new F.a;return n.id=l.id,n.situacao=l.situacao,this.margemService.atualizarSituacao(n).pipe(Object(Il.a)(n=>k({id:l.id,situacao:l.situacao})))})))}countRegistros(l){return this.margemService.count(l)}findRegistros(l){return this.margemService.pesquisar(l)}saveRegistro(l){throw new Error("Method not implemented.")}updateStatus(l){throw new Error("Method not implemented.")}}var Al=u("7jfr");u.d(n,"VisualizacaoMargemModuleNgFactory",(function(){return Ml}));var Ml=e["\u0275cmf"](a,[],(function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[t.a,el]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,v["\u0275angular_packages_forms_forms_o"],v["\u0275angular_packages_forms_forms_o"],[]),e["\u0275mpd"](4608,o.NgLocalization,o.NgLocaleLocalization,[e.LOCALE_ID,[2,o["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](1073742336,v["\u0275angular_packages_forms_forms_d"],v["\u0275angular_packages_forms_forms_d"],[]),e["\u0275mpd"](1073742336,v.FormsModule,v.FormsModule,[]),e["\u0275mpd"](1073742336,o.CommonModule,o.CommonModule,[]),e["\u0275mpd"](1073742336,al.a,al.a,[]),e["\u0275mpd"](1073742336,tl.a,tl.a,[]),e["\u0275mpd"](1073742336,ol.n,ol.n,[[2,ol.s],[2,ol.k]]),e["\u0275mpd"](1073742336,il,il,[]),e["\u0275mpd"](1073742336,rl.ButtonModule,rl.ButtonModule,[]),e["\u0275mpd"](1073742336,f.SharedModule,f.SharedModule,[]),e["\u0275mpd"](1073742336,sl.CalendarModule,sl.CalendarModule,[]),e["\u0275mpd"](1073742336,dl.a,dl.a,[]),e["\u0275mpd"](1073742336,cl.b,cl.b,[]),e["\u0275mpd"](1073742336,gl.ScrollingModule,gl.ScrollingModule,[]),e["\u0275mpd"](1073742336,pl.TooltipModule,pl.TooltipModule,[]),e["\u0275mpd"](1073742336,ml.DropdownModule,ml.DropdownModule,[]),e["\u0275mpd"](1073742336,fl.PaginatorModule,fl.PaginatorModule,[]),e["\u0275mpd"](1073742336,m.TableModule,m.TableModule,[]),e["\u0275mpd"](1024,I.I,(function(){return[{}]}),[]),e["\u0275mpd"](1024,I.k,(function(){return[{key:"visualizacoes-margens",reducerFactory:I.t,metaReducers:[],initialState:void 0}]}),[]),e["\u0275mpd"](1024,I.J,I.P,[e.Injector,I.I,I.k]),e["\u0275mpd"](1024,I.H,(function(){return[Ol]}),[]),e["\u0275mpd"](1024,I.K,(function(l){return[l]}),[I.H]),e["\u0275mpd"](1024,I.b,(function(l,n,u){return[I.Q(l,n,u)]}),[e.Injector,I.H,I.K]),e["\u0275mpd"](1073873408,I.p,I.p,[I.J,I.b,I.h,I.q]),e["\u0275mpd"](512,yl,yl,[Rl.a,I.o,Al.a]),e["\u0275mpd"](1024,Rl.j,(function(l){return[Rl.f(l)]}),[yl]),e["\u0275mpd"](1073742336,Rl.h,Rl.h,[Rl.g,Rl.j,[2,I.q],[2,I.p]]),e["\u0275mpd"](1073742336,a,a,[]),e["\u0275mpd"](1024,ol.i,(function(){return[[{path:"",component:H}]]}),[])])}))}}]);