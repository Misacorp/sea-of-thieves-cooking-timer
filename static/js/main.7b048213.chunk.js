(window["webpackJsonpsea-of-thieves-cooking-timer"]=window["webpackJsonpsea-of-thieves-cooking-timer"]||[]).push([[0],{118:function(e,n){},121:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(63),i=t.n(o),c=(t(79),t(10)),u=t(1),l=t(64),m=t.n(l),s=["Roboto","Arial","sans-serif"],f={palette:{primary:{main:"#efd71f",light:"#fff8bf",dark:"#59563d"},secondary:{main:"#FFE2BC",light:"#FFF9F0",dark:"#C79349"},success:{main:"#319F4A",light:"#55D370",dark:"#257134"},error:{main:"#D34E41",light:"#FF7365",dark:"#953930"},disabled:{main:"#7A7A7A"},typography:{light:"#FFFFFF",dark:"#020202"}},typography:{base:{fontFamily:s.join(",")},title:{fontFamily:["Montserrat"].concat(s).join(",")}},emoji:"\ud83e\udd65",transition:{duration:"0.2s",timingFunction:"ease-out"},appDrawer:{width:{mobile:{open:"90vw",closed:"0"},desktop:{open:"240px",closed:"0"}}}},d=t(2);function E(){var e=Object(d.a)(["\n  body {\n    font-family: ",";\n    color: ",";\n    background-color: #1A1A1A;\n  }\n\n  h1, h2, h3, h4, h5, h6 {\n    font-family: ",";\n    font-weight: 600;\n\n    svg {\n      vertical-align: middle;\n      margin-right: 0.3em;\n      margin-top: -0.5%;\n    }\n  }\n\n  h1, h2 {\n    font-weight: 700;\n  }\n\n  h3 {\n    color: ","\n  }\n"]);return E=function(){return e},e}var b=Object(u.createGlobalStyle)(E(),function(e){return e.theme.typography.base.fontFamily},function(e){return e.theme.palette.typography.light},function(e){return e.theme.typography.title.fontFamily},function(e){return e.theme.palette.primary.dark}),O=t(16);function p(){var e=Object(d.a)(["\n  height: 50px;\n  background-color: ",";\n  color: black;\n\n  h1 {\n    margin: 0;\n    padding: 0.5rem 0.25rem;\n    text-align: center;\n  }\n"]);return p=function(){return e},e}var h=Object(u.default)(function(e){var n=e.className;return r.a.createElement("div",{className:n},r.a.createElement(c.b,{to:"/"},r.a.createElement("h1",null,"Cooking Timer")))})(p(),function(e){return e.theme.palette.primary.main});function v(){var e=Object(d.a)(["\n  display: ","\n  background-color: ",";\n  color: ",";\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n  margin-left: ","\n  margin-right: ","\n  padding: 0.5rem 1rem;\n  text-decoration: none;\n\n  border-radius: 3rem;\n  text-transform: uppercase;\n\n  &:disabled {\n    background-color: ",";\n    pointer-events: none;\n  }\n"]);return v=function(){return e},e}var g,N=Object(u.default)(function(e){var n=e.to,t=e.className,a=e.children;return r.a.createElement(c.b,{to:n,className:t},a)})(v(),function(e){return"inline"===e.variant?"inline-block":"block"},function(e){return e.theme.palette.primary.main},function(e){return e.theme.palette.typography.dark},function(e){return"inline"===e.variant?"0.5rem":"auto"},function(e){return"inline"===e.variant?"0.5rem":"auto"},function(e){return e.theme.palette.disabled.main}),T=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(N,{to:"/offline",variant:"inline"},"Offline"),r.a.createElement(N,{to:"/online",variant:"inline"},"Online"))},j=t(6),C=t.n(j),S=t(21),k=t(31),R=function(){function e(n){Object(S.a)(this,e),this.code=n,this.members={},this.timers=[],this.abandonedSince=null}return Object(k.a)(e,[{key:"getMemberNames",value:function(){var e=this;return Object.keys(this.members).map(function(n){return e.members[n].nickname})}},{key:"getMemberById",value:function(e){return this.members[e]}},{key:"addMember",value:function(e){this.members[e.id]=e,this.abandonedSince=null}},{key:"removeMember",value:function(e){delete this.members[e],Object.keys(this.members).length<1&&(this.abandonedSince=new Date)}},{key:"addTimer",value:function(e){this.timers.push(e)}},{key:"getTimer",value:function(e){for(var n=this.timers.length,t=0;t<n;t+=1){var a=this.timers[t];if(a.id===e)return a}throw new Error("Could not find timer with id ".concat(e))}}]),e}(),I={FISH:{name:"Fish",duration:40},TROPHY_FISH:{name:"Trophy Fish",duration:90},MEAT:{name:"Meat",duration:60},MONSTER_MEAT:{name:"Monster Meat",duration:120}},y=function(){function e(n){Object(S.a)(this,e),this.id=n,this.state="SELECT",this.startDate,this.duration}return Object(k.a)(e,[{key:"start",value:function(e){if(Object.keys(I).includes(e))return this.state="RUNNING",this.startDate=(new Date).toString(),this.duration=I[e].duration,this.foodName=I[e].name,this;throw new TypeError("Cannot start a timer with food ".concat(e))}},{key:"reset",value:function(){this.state="SELECT"}}]),e}(),_=new(t(125).a),w=function(e,n){return _.next({topic:e,data:n})},M=_,A=function(){w("TIMER_SYNC",{type:"TIMER_SYNC",id:C()(),timestamp:(new Date).toString(),timers:g.timers})},D={init:function(){g=new R("LOCL"),function(e){for(var n=0;n<e;n+=1)g.addTimer(new y(C()()))}(4),w("ROOM_CREATED","LOCL")},on:function(e,n){return console.log("fakeSocket on:",e,n)},emit:function(e,n){switch(e){case"REQUEST_TIMERS":A();break;case"START":var t=n.id,a=n.food;g.getTimer(t).start(a),A();break;case"RESET":var r=n.id;g.getTimer(r).reset(),A();break;default:w("GENERIC_MESSAGE",{type:"GENERIC_MESSAGE",id:C()(),timestamp:(new Date).toString(),message:"fakeSocket has no handler for your action. ".concat(e)})}}},x=Object(a.createContext)(null),F=t(3),L=t(5),B=t(124),U=function(e){var n=Object(a.useRef)();return Object(a.useEffect)(function(){var t=Object.keys(e);return n.current=M.pipe(Object(B.a)(function(e){var n=e.topic;return t.includes(n)})).subscribe(function(n){var t=n.topic,a=n.data;e[t](a)}),function(){n.current.unsubscribe()}},[e]),n},G=function(){var e=Object(a.useContext)(x).socket;if(!e)throw new Error("Socket not defined");var n=Object(a.useCallback)(function(n,t){e.emit("JOIN_ROOM",{roomCode:n,nickname:t})},[e]);return{start:function(n,t){return function(){e.emit("START",{id:n,food:t})}},reset:function(n){return function(){e.emit("RESET",{id:n})}},createRoom:Object(a.useCallback)(function(n){e?e.emit("CREATE_ROOM",{nickname:n}):console.log("No socket!",e)},[e]),joinRoom:n,requestTimers:function(){e.emit("REQUEST_TIMERS")}}},P=t(32),H=t.n(P);function J(){var e=Object(d.a)(["\n  width: calc(100vw - 1rem);\n  height: calc(100vw - 1rem);\n  margin: 0.5rem;\n"]);return J=function(){return e},e}function Y(){var e=Object(d.a)(["\n    50%   50%\n50% A     B\n50% C     D\n"]);return Y=function(){return e},e}var X=H()(Y()),W=Object(u.default)(X)(J()),z=function(e){var n=e.food,t=e.timeLeft,a=e.className;return r.a.createElement("div",{className:a},r.a.createElement("p",null,n," is cooking"),r.a.createElement("h2",null,t))};function q(){var e=Object(d.a)(["\n  padding: 1rem;\n  background-color: ",";\n"]);return q=function(){return e},e}var K=u.default.button(q(),function(e){return e.theme.palette.primary.main}),Q=function(e){var n=e.reset,t=e.className;return r.a.createElement("div",{className:t},r.a.createElement("p",null,"Timer has stopped"),r.a.createElement(K,{type:"button",onClick:n},"OK"))};function V(){var e=Object(d.a)(["\n  width: 100%;\n  height: 100%;\n"]);return V=function(){return e},e}function $(){var e=Object(d.a)(["\n    50% 50%\n50% A   B\n50% C   D\n"]);return $=function(){return e},e}var Z=H()($()),ee=Object(u.default)(Z)(V());function ne(){var e=Object(d.a)(["\n  position: relative;\n  margin: 0;\n  padding: 0rem;\n  border: none;\n  font: inherit;\n  color: inherit;\n  background-color: transparent;\n  /* show a hand cursor on hover; some argue that we\n  should keep the default arrow cursor for buttons */\n  cursor: pointer;\n\n  background-color: ",";\n  color: ",";\n\n  width: calc(100% - 6px);\n  height: calc(100% - 6px);\n  margin: 3px;\n"]);return ne=function(){return e},e}var te=Object(u.default)(function(e){var n=e.onClick,t=e.children,a=e.className;return r.a.createElement("button",{type:"button",onClick:n,className:a},t)})(ne(),function(e){return e.theme.palette.primary.main},function(e){return e.theme.palette.typography.dark}),ae=function(e){var n=e.start,t=e.className;return r.a.createElement(ee,{className:t},r.a.createElement(te,{onClick:n("FISH")},"Fish"),r.a.createElement(te,{onClick:n("TROPHY_FISH")},"Trophy Fish"),r.a.createElement(te,{onClick:n("MEAT")},"Meat"),r.a.createElement(te,{onClick:n("MONSTER_MEAT")},"Monster meat"))},re=t(69),oe=t.n(re);function ie(){var e=Object(d.a)(["\n  height: calc(100% - 0.5rem);\n  width: calc(100% - 0.5rem);\n  padding: 0.1rem;\n  margin: 0.25rem;\n  background-color: ",";\n\n  text-align: center;\n"]);return ie=function(){return e},e}var ce=Object(u.default)(function(e){var n=e.id,t=e.startDate,o=e.state,i=e.duration,c=e.foodName,u=e.className,l=G(),m=l.start,s=l.reset,f=Object(a.useState)(!1),d=Object(L.a)(f,2),E=d[0],b=d[1];Object(a.useEffect)(function(){b(!1)},[t]);var O=function(){var e=new Date,n=new Date(t),a=i-(e-n)/1e3;return Math.max(0,Math.round(a))}();return O<=0&&!E&&(new Audio(oe.a).play(),b(!0)),"RUNNING"===o&&O>0?r.a.createElement(z,{food:c,timeLeft:O,className:u}):"STOPPED"===o||O<=0&&"RUNNING"===o?r.a.createElement(Q,{reset:s(n),className:u}):"SELECT"===o?r.a.createElement(ae,{start:function(e){return m(n,e)},className:u}):r.a.createElement("p",null,"Unknown state")})(ie(),function(e){return e.theme.palette.primary.dark}),ue=function(){var e=Object(a.useState)([]),n=Object(L.a)(e,2),t=n[0],o=n[1],i=t.length,c=Object(a.useRef)(Object(F.a)({},"TIMER_SYNC",function(e){o(e.timers)}));U(c.current);var u=Object(a.useState)(new Date),l=Object(L.a)(u,2)[1],m=G().requestTimers;return Object(a.useEffect)(function(){var e=setInterval(function(){l(new Date)},200);return i<1&&(console.log("[TimerGrid] No timers!"),m()),function(){clearInterval(e)}},[i,m]),4!==t.length?r.a.createElement("p",null,"No timers"):r.a.createElement(W,null,t.map(function(e){return r.a.createElement(ce,{key:e.id,id:e.id,startDate:e.startDate,duration:e.duration,foodName:e.foodName,state:e.state})}))},le=function(){var e=Object(a.useRef)();return D.init(),e.current=D,r.a.createElement(x.Provider,{value:{socket:e.current}},r.a.createElement(ue,null))},me=(t(86),t(33));function se(){var e=Object(d.a)(["\n  /* Reset button styles */\n  border: none;\n  font: inherit;\n  cursor: pointer;\n\n  display: ","\n  background-color: ",";\n  color: ",";\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n  margin-left: ","\n  margin-right: ","\n  padding: 0.5rem 1rem;\n\n  border-radius: 3rem;\n  text-transform: uppercase;\n\n  &:disabled {\n    background-color: ",";\n    pointer-events: none;\n  }\n"]);return se=function(){return e},e}var fe=Object(u.default)(function(e){var n=e.onClick,t=e.children,a=e.className,o=(e.variant,Object(me.a)(e,["onClick","children","className","variant"]));return r.a.createElement("button",Object.assign({type:"button",onClick:n,className:a},o),t)})(se(),function(e){return"inline"===e.variant?"inline-block":"block"},function(e){return e.theme.palette.primary.main},function(e){return e.theme.palette.typography.dark},function(e){return"inline"===e.variant?"0.5rem":"auto"},function(e){return"inline"===e.variant?"0.5rem":"auto"},function(e){return e.theme.palette.disabled.main});function de(){var e=Object(d.a)(["\n  position: relative;\n  text-align: center;\n"]);return de=function(){return e},e}function Ee(){var e=Object(d.a)(["\n  display: inline-block;\n  background-color: #7a7a7a;\n  padding: 0.25rem 0.5rem;\n  color: ",";\n  font-size: 0.75rem;\n  font-weight: bold;\n\n  ::before {\n    content: '';\n    height: 1px;\n    width: 100%;\n    background-color: #7a7a7a;\n    position: absolute;\n    left: 0;\n    top: 50%;\n    z-index: -1;\n  }\n"]);return Ee=function(){return e},e}var be=u.default.p(Ee(),function(e){return e.theme.palette.typography.dark}),Oe=Object(u.default)(function(e){var n=e.className,t=e.children;return r.a.createElement("div",{className:n},r.a.createElement(be,null,t))})(de());function pe(){var e=Object(d.a)(["\n  background-color: white;\n  border: none;\n  padding: 1rem;\n  font-size: 1rem;\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n  margin-left: ","\n  margin-right: ","\n  display: ","\n"]);return pe=function(){return e},e}var he=u.default.input(pe(),function(e){return"inline"===e.variant?"0.5rem":"auto"},function(e){return"inline"===e.variant?"0.5rem":"auto"},function(e){return"inline"===e.variant?"inline-block":"block"});function ve(){var e=Object(d.a)([""]);return ve=function(){return e},e}var ge=Object(u.default)(function(e){var n=e.className,t=Object(a.useContext)(x),o=t.nickname,i=t.setNickname,u=t.activeRoomCode,l=t.setActiveRoomCode,m=function(){return"string"===typeof o&&o.length>=3&&o.length<=32},s=Object(a.useState)(""),f=Object(L.a)(s,2),d=f[0],E=f[1],b=Object(a.useCallback)(function(e){return 4===(e||d).length},[d]),p=G().createRoom,h=Object(a.useRef)(Object(F.a)({},"ROOM_CREATED",function(e){l(e)}));U(h.current);var v=Object(a.useState)("INIT"),g=Object(L.a)(v,2),N=g[0],T=g[1];return Object(a.useEffect)(function(){u&&b(u)&&T("ROOM_ACTIVE")},[u,b]),"ROOM_ACTIVE"===N?r.a.createElement(O.a,{to:"".concat("/online","/").concat(u)}):r.a.createElement("div",{className:n},r.a.createElement(he,{type:"text",onChange:function(e){var n=e.target.value;i(n)},value:o,placeholder:"My name is...","aria-label":"Nickname","aria-required":"true",style:{marginBottom:"4rem"}}),m()&&r.a.createElement(r.a.Fragment,null,r.a.createElement(fe,{variant:"main",disabled:!m(),onClick:function(){m()&&p(o)}},"Create room"),r.a.createElement(Oe,null,"OR"),r.a.createElement(he,{type:"text",onChange:function(e){var n=e.target.value;n.length<=4&&(n=n.toUpperCase(),E(n))},value:d,placeholder:"Room code","aria-label":"Room code"}),r.a.createElement(c.b,{to:"/online/".concat(d)},r.a.createElement(fe,{variant:"main",disabled:!b()},"Join room"))))})(ve());function Ne(){var e=Object(d.a)(["\n  text-align: center;\n"]);return Ne=function(){return e},e}var Te=Object(u.default)(function(e){var n=e.className,t=Object(a.useContext)(x).activeRoomCode;return r.a.createElement("p",{className:n},"Room ",t)})(Ne()),je=t(44),Ce=t.n(je),Se=function(e){var n,t=G().joinRoom,o=Object(a.useContext)(x),i=o.nickname,c=o.activeRoomCode,u=o.setActiveRoomCode,l=Object(a.useState)("INIT"),m=Object(L.a)(l,2),s=m[0],f=m[1],d=i&&i.length>0,E=Object(a.useCallback)(function(e){var n;d?(n={nickname:i},Object.keys(n).forEach(function(e){var t=n[e];Ce()(e,t)}),console.log("Joining room ".concat(e)),t(e,i)):(console.log("Can't join room. Nickname is not set."),f("NO_NICKNAME"))},[t,d,i]),b=Object(a.useRef)((n={},Object(F.a)(n,"NONEXISTANT_ROOM",function(){console.log("[NONEXISTANT_ROOM] Setting activeRoomCode to null."),u(null),f("NONEXISTANT_ROOM")}),Object(F.a)(n,"USER_JOINED",function(e){console.log("[USER_JOINED] Setting activeRoomCode to ".concat(e.roomCode)),u(e.roomCode)}),Object(F.a)(n,"MEMBER_LIST",function(){console.log("[MEMBER_LIST] User list received. Everything is good to go!"),f("READY")}),Object(F.a)(n,"INT_CONNECTION_REESTABLISHED",function(){console.log("Connection re-established. activeRoomCode is ".concat(c)),c?(console.log("Since an active room code exists, we will try to rejoin the room."),E(c)):(console.log("Since no active room code exists, we will set the status to NONEXISTANT_ROOM"),f("NONEXISTANT_ROOM"))}),n));U(b.current);var p=e.match.params.roomCode;return Object(a.useEffect)(function(){console.log("Component mounted. Attempting to join room ".concat(p,".")),E(p)},[E,p]),console.log("OnlineRoom rendering time. Status is ".concat(s)),"INIT"===s?r.a.createElement("p",null,"Joining room..."):"NONEXISTANT_ROOM"===s||"NO_NICKNAME"===s?r.a.createElement(O.a,{to:"/online"}):"READY"===s?r.a.createElement(r.a.Fragment,null,r.a.createElement(Te,null),r.a.createElement(ue,null)):r.a.createElement("p",null,"Unknown OnlineRoom status")},ke=t(70),Re=t.n(ke),Ie=function(){return Re()("https://sea-of-thieves-cooking-timer.herokuapp.com")};function ye(){var e=Object(d.a)(["\n  height: 30px;\n  background-color: #efd71f;\n  color: black;\n\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  text-align: center;\n\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return ye=function(){return e},e}var _e=Object(u.default)(function(e){var n=e.children,t=e.className;return r.a.createElement("div",{className:t},n)})(ye());function we(){var e=Object(d.a)(["\n  text-align: center;\n"]);return we=function(){return e},e}var Me,Ae=Object(u.default)(function(e){var n,t=e.className,o=Object(a.useState)(!1),i=Object(L.a)(o,2),c=i[0],u=i[1],l=Object(a.useRef)((n={},Object(F.a)(n,"INT_CONNECTION_ESTABLISHED",function(){u(!0)}),Object(F.a)(n,"INT_CONNECTION_REESTABLISHED",function(){u(!0)}),Object(F.a)(n,"INT_CONNECTION_DROPPED",function(){u(!1)}),n));return U(l.current),r.a.createElement("div",{className:t},"Connected: ",c?"\u2714":"\u274c")})(we()),De=function(){var e,n=!1,t=!1,a=function(){return clearInterval(e)};return{init:function(r){e&&a(),e=setInterval(function(){var e=r.connected;e!==n&&(e?t?w("INT_CONNECTION_REESTABLISHED",{type:"INT_CONNECTION_REESTABLISHED",id:C()(),timestamp:new Date}):(w("INT_CONNECTION_ESTABLISHED",{type:"INT_CONNECTION_ESTABLISHED",id:C()(),timestamp:new Date}),t=!0):w("INT_CONNECTION_DROPPED",{type:"INT_CONNECTION_DROPPED",id:C()(),timestamp:new Date})),n=e},1e3)},reset:a}},xe=(Me="nickname",Ce()(Me)||"");var Fe=function(){var e=Object(a.useState)(null),n=Object(L.a)(e,2),t=n[0],o=n[1],i=Object(a.useState)(xe),c=Object(L.a)(i,2),u=c[0],l=c[1],m=Object(a.useRef)();void 0===m.current&&(console.log("No socket set. Creating!"),m.current=Ie(),function(e){e.on("USER_JOINED",function(e){var n=e.nickname,t=e.timestamp,a=e.roomCode;w("USER_JOINED",{type:"USER_JOINED",id:C()(),nickname:n,timestamp:t,roomCode:a})}),e.on("MEMBER_LIST",function(e){var n=e.timestamp,t=e.members;w("MEMBER_LIST",{type:"MEMBER_LIST",id:C()(),timestamp:n,members:t})}),e.on("USER_LEFT",function(e){var n=e.nickname,t=e.timestamp;w("USER_LEFT",{type:"USER_LEFT",id:C()(),nickname:n,timestamp:t})}),e.on("ROOM_CREATED",function(e){var n=e.roomCode;w("ROOM_CREATED",n)}),e.on("NONEXISTANT_ROOM",function(e){var n=e.roomCode,t=e.timestamp;w("NONEXISTANT_ROOM",{type:"NONEXISTANT_ROOM",id:C()(),roomCode:n,timestamp:t})}),e.on("TIMER_SYNC",function(e){var n=e.timers,t=e.message;w("TIMER_SYNC",{type:"TIMER_SYNC",id:C()(),timestamp:(new Date).toString(),timers:n,message:t})}),e.on("GENERIC_MESSAGE",function(e){var n=e.message;w("GENERIC_MESSAGE",{type:"GENERIC_MESSAGE",id:C()(),timestamp:(new Date).toString(),message:n})})}(m.current),De().init(m.current));var s={socket:m.current,nickname:u,setNickname:function(e){return l(e)},activeRoomCode:t,setActiveRoomCode:function(e){return o(e)}};return Object(a.useEffect)(function(){console.log(">> activeRoomCode changed to ".concat(t,"."))},[t]),r.a.createElement(x.Provider,{value:s},r.a.createElement(O.d,null,r.a.createElement(O.b,{path:"".concat("/online","/:roomCode"),component:Se}),r.a.createElement(O.b,{path:"/",component:ge})),r.a.createElement(_e,null,r.a.createElement(Ae,null)))},Le=t(71);function Be(){var e=Object(d.a)(["\n  background-color: white;\n  display: inline-flex;\n  padding: 0.5rem 1rem;\n  border-radius: 1rem;\n  color: ",";\n  margin: 0.15rem;\n  animation: "," 1s ease-out 6s 1 forwards;\n"]);return Be=function(){return e},e}function Ue(){var e=Object(d.a)(["\n  from {\n    opacity: 1;\n  }\n\n  to {\n    opacity: 0;\n  }\n"]);return Ue=function(){return e},e}function Ge(){var e=Object(d.a)(["\n  padding-right: 0.5rem;\n  color: #9f9f9f;\n"]);return Ge=function(){return e},e}var Pe=u.default.span(Ge()),He=Object(u.keyframes)(Ue()),Je=Object(u.default)(function(e){var n=e.className,t=e.timestamp,a=e.children,o=new Date(t);return r.a.createElement("p",{className:n},r.a.createElement(Pe,null,"".concat(o.getHours(),":").concat(o.getMinutes())),r.a.createElement("span",null,a))})(Be(),function(e){return e.theme.palette.typography.dark},He),Ye={USER_JOINED:function(e){var n=e.nickname,t=e.roomCode;return"".concat(n," joined room ").concat(t)},MEMBER_LIST:function(e){var n=e.members.join(", ");return"Current members: ".concat(n)},USER_LEFT:function(e){var n=e.nickname;return"".concat(n," left")},NONEXISTANT_ROOM:function(e){var n=e.roomCode;return"Room ".concat(n," doesn't exist")},TIMER_SYNC:function(e){return e.message},GENERIC_MESSAGE:function(e){return e.message},INT_CONNECTION_ESTABLISHED:function(){return"Connection estabished"},INT_CONNECTION_REESTABLISHED:function(){return"Connection re-estabished"},INT_CONNECTION_DROPPED:function(){return"Connection dropped"}},Xe=Ye,We=function e(n){var t=n.id,a=n.timestamp,r=n.content;Object(S.a)(this,e),this.id=t,this.timestamp=a,this.content=r};function ze(){var e=Object(d.a)(["\n  position: absolute;\n  bottom: 2.5rem;\n  left: 0.25rem;\n  right: 0.25rem;\n  text-align: right;\n  z-index: 999;\n  user-select: none;\n  pointer-events: none;\n\n  & span {\n    text-align: left;\n  }\n"]);return ze=function(){return e},e}var qe=Object(u.default)(function(e){var n,t=e.className,o=Object(a.useState)([]),i=Object(L.a)(o,2),c=i[0],u=i[1],l=function(e){var n=e.id,t=e.type,a=e.timestamp,r=Object(me.a)(e,["id","type","timestamp"]),o=Xe[t](r),i=new We({id:n,timestamp:a.toString(),content:o});u(function(e){return[].concat(Object(Le.a)(e),[i])})},m=Object(a.useRef)((n={},Object(F.a)(n,"USER_JOINED",function(e){l(e)}),Object(F.a)(n,"USER_LEFT",function(e){l(e)}),Object(F.a)(n,"MEMBER_LIST",function(e){l(e)}),Object(F.a)(n,"NONEXISTANT_ROOM",function(e){l(e)}),Object(F.a)(n,"TIMER_SYNC",function(e){e.message&&l(e)}),Object(F.a)(n,"GENERIC_MESSAGE",function(e){l(e)}),Object(F.a)(n,"INT_CONNECTION_DROPPED",function(e){l(e)}),Object(F.a)(n,"INT_CONNECTION_ESTABLISHED",function(e){l(e)}),Object(F.a)(n,"INT_CONNECTION_REESTABLISHED",function(e){l(e)}),n));return U(m.current),r.a.createElement("div",{className:t},c.slice(-7).map(function(e){return r.a.createElement(Je,{key:"".concat(e.id),timestamp:e.timestamp},e.content)}))})(ze()),Ke=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(h,null),r.a.createElement(O.d,null,r.a.createElement(O.b,{exact:!0,path:"/offline",component:le}),r.a.createElement(O.b,{path:"/online",component:Fe}),r.a.createElement(O.b,{path:"/",component:T})),r.a.createElement(qe,null))};m.a.load({google:{families:["Montserrat:500,600,800","serif"]}});var Qe="/sea-of-thieves-cooking-timer";var Ve=function(){return r.a.createElement(u.ThemeProvider,{theme:f},r.a.createElement(r.a.Fragment,null,r.a.createElement(b,null),r.a.createElement(c.a,{basename:Qe},r.a.createElement(Ke,null))))},$e=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Ze(e,n){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}i.a.render(r.a.createElement(Ve,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/sea-of-thieves-cooking-timer",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var n="".concat("/sea-of-thieves-cooking-timer","/service-worker.js");$e?(!function(e,n){fetch(e).then(function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):Ze(e,n)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(n,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):Ze(n,e)})}}()},69:function(e,n,t){e.exports=t.p+"static/media/annoying-vuvuzela-tone.7c0e3fdb.mp3"},74:function(e,n,t){e.exports=t(121)},79:function(e,n,t){}},[[74,1,2]]]);
//# sourceMappingURL=main.7b048213.chunk.js.map