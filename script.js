const header = document.querySelector(".site-header");
const progress = document.getElementById("scrollProgress");
const backTop = document.getElementById("backTop");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

function onScroll(){
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height ? (scrollTop / height) * 100 : 0}%`;
  header.classList.toggle("scrolled", scrollTop > 20);
  backTop.classList.toggle("show", scrollTop > 500);
}
window.addEventListener("scroll", onScroll, {passive:true});
onScroll();

menuToggle.addEventListener("click", ()=>{
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

backTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
document.getElementById("year").textContent = new Date().getFullYear();

function handleForm(event){
  event.preventDefault();
  const note = document.getElementById("formNote");
  note.textContent = "Thank you. Your message is ready to be connected to the school's email/backend.";
  note.style.color = "#1f5a3b";
  event.target.reset();
}
