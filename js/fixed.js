function Всплывающееменю() {
    var fixed_l = document.querySelector("#fixed_l");
    var fixed = document.querySelector("#fixed");
    var body = document.querySelector("body");
    fixed.style.display = "none";
    /*if (fixed_l) {
        body.removeChild(fixed_l);
    }*/
    var fixed_menu = document.createElement("div");
    fixed_menu.id = "fixed_menu";
    body.appendChild(fixed_menu);
    var Telegram_link = document.createElement("a");
    //Telegram_link.href = "https://t.me/ibctv";
    fixed_menu.appendChild(Telegram_link);
    var Telegram = document.createElement("div");
    Telegram.id = "Telegram_fixed";
    Telegram_link.appendChild(Telegram);
    var Instagram_link = document.createElement("a");
    //Instagram_link.href = "https://www.instagram.com/international_business_compan/";
    fixed_menu.appendChild(Instagram_link);
    var Instagram = document.createElement("div");
    Instagram.id = "Instagram_fixed";
    Instagram_link.appendChild(Instagram);
    var Facebook_link = document.createElement("a");
    //Facebook_link.href = "https://www.facebook.com/Smile-Group-132063154112284";
    fixed_menu.appendChild(Facebook_link);
    var Facebook = document.createElement("div");
    Facebook.id = "Facebook_fixed";
    Facebook_link.appendChild(Facebook);
    var Vkontakte_link = document.createElement("a");
    //Vkontakte_link.href = "https://vk.com/vk.optovik";
    fixed_menu.appendChild(Vkontakte_link);
    var Vkontakte = document.createElement("div");
    Vkontakte.id = "Vkontakte_fixed";
    Vkontakte_link.appendChild(Vkontakte);
    var Whatsapp_link = document.createElement("a");
    //Whatsapp_link.href = "http://wa.me/79141208707?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5.%20%D0%9C%D0%BE%D0%B6%D0%BD%D0%BE%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%B5%D0%B5%20%3F";
    fixed_menu.appendChild(Whatsapp_link);
    var Whatsapp = document.createElement("div");
    Whatsapp.id = "Whatsapp_fixed";
    Whatsapp_link.appendChild(Whatsapp);
    var Bec = document.createElement("div");
    Bec.id = "Bec";
    Bec.onclick = function Bec() {
        /*var fixed_l = document.createElement("a");
        fixed_l.id = "fixed_l";
        fixed_l.href = "#";
        fixed_l.onclick = Всплывающееменю();
        body.appendChild(fixed_l);
        var fixed = document.createElement("div");
        fixed.id = "fixed";
        fixed_l.appendChild(fixed);*/
        //fixed_menu.removeChild(Vkontakte_link);
        //fixed_menu.remove();
        var fixed = document.querySelector("#fixed");
        fixed.removeAttribute("style");
        body.removeChild(fixed_menu);
        var fixed_l = document.createElement("a");
        fixed_l.id = "fixed_l";
        fixed_l.href = "#fixed_l";
        fixed_l.onclick = function Всплывающееменю2() {
            Всплывающееменю()
        };
        body.appendChild(fixed_l);
        /*var fixed = document.createElement("div");
        fixed.id = "fixed";
        fixed_l.appendChild(fixed);*/
        //fixed_menu[0].body.removeChild(fixed_menu[0]);
    }
    fixed_menu.appendChild(Bec);

}