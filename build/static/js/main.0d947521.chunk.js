(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n(15),s=n.n(c),a=n(3),o=n(4),i=n.n(o),u=n(0),j=function(e){return Object(u.jsxs)("div",{children:["find: ",Object(u.jsx)("input",{type:"text","aria-label":"filter",value:e.newSearchTerm,onChange:function(t){e.setNewSearchTerm(t.target.value)}})]})},b=function(e){var t=e.person,n=e.deletePerson;return Object(u.jsx)("div",{children:Object(u.jsxs)("ul",{children:[t.name," ",t.number," ",Object(u.jsx)("button",{onClick:n,children:"delete"})]})})},l="https://safe-oasis-25800.herokuapp.com/api/persons",d=function(){return i.a.get(l)},h=function(e){return i.a.post(l,e)},f=function(e,t){return i.a.put("".concat(l,"/").concat(e),t)},O=function(e){var t=Object(r.useState)(""),n=Object(a.a)(t,2),c=n[0],s=n[1],o=Object(r.useState)(""),i=Object(a.a)(o,2),j=i[0],b=i[1];return Object(u.jsx)("div",{children:Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={name:c,number:j},r=e.persons.find((function(e){return e.name===c}));r&&window.confirm(c+" is already added to phonebook, replace the old number with a new one?")?(f(r.id,n),e.setErrorMessage(r.name+"'s phone number has been changed"),setTimeout((function(){e.setErrorMessage(null)}),3e3),s(""),b("")):(h(n),e.setErrorMessage(c+" has been added to the server"),setTimeout((function(){e.setErrorMessage(null)}),3e3),s(""),b(""))},children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{type:"text","aria-label":"name",value:c,onChange:function(e){s(e.target.value)}})]}),Object(u.jsx)("div",{children:Object(u.jsx)("br",{})}),Object(u.jsxs)("div",{children:["number: ",Object(u.jsx)("input",{type:"text","aria-label":"number",value:j,onChange:function(e){b(e.target.value)}})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})})},m=function(e){var t=e.message;return null===t?null:Object(u.jsx)("div",{className:"error",children:t})},p=(n(14),function(){var e=Object(r.useState)(),t=Object(a.a)(e,1)[0],n=Object(r.useState)(""),c=Object(a.a)(n,2),s=c[0],o=c[1],l=Object(r.useState)([]),h=Object(a.a)(l,2),f=h[0],p=h[1],x=Object(r.useState)(null),v=Object(a.a)(x,2),g=v[0],w=v[1];Object(r.useEffect)((function(){d().then((function(e){p(e.data)}))}),[]);var S=t?f:f.filter((function(e){return e.name.includes(s)}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(m,{message:g}),Object(u.jsx)(j,{persons:f,newSearchTerm:s,setNewSearchTerm:o}),Object(u.jsx)("h3",{children:"Add a new"}),Object(u.jsx)(O,{persons:S,setErrorMessage:w}),Object(u.jsx)("h3",{children:"Numbers"}),Object(u.jsx)("ul",{children:S.map((function(e,t){return Object(u.jsx)(b,{person:e,deletePerson:function(){return function(e){var t="https://safe-oasis-25800.herokuapp.com/api/persons/"+e,n=f.find((function(t){return t.id===e}));window.confirm("Delete "+n.name+"?")&&i.a.delete(t).catch((function(e){w(n.name+" has already been removed from the server"),setTimeout((function(){w(null)}),3e3)}))}(e.id)}},t)}))})]})});s.a.render(Object(u.jsx)(p,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.0d947521.chunk.js.map