angular.module('templates-app', ['about/about.tpl.html', 'account/account.invitations.tpl.html', 'account/account.options.tpl.html', 'account/account.tpl.html', 'admin/admin.invitations.tpl.html', 'admin/admin.options.tpl.html', 'admin/admin.receivedInvitations.tpl.html', 'admin/admin.sendInvitation.tpl.html', 'admin/admin.tpl.html', 'clients/clients.tpl.html', 'forgotPassword/forgotPassword.tpl.html', 'home/home.tpl.html', 'invitation/invitation.tpl.html', 'login/login.tpl.html', 'manager/manager.invitations.tpl.html', 'manager/manager.options.tpl.html', 'manager/manager.receivedInvitations.tpl.html', 'manager/manager.sendInvitation.tpl.html', 'manager/manager.tpl.html', 'parts/parts.tpl.html', 'profiles/profiles.tpl.html', 'register/register.tpl.html', 'rooms/rooms.tpl.html', 'seats/seats.tpl.html', 'states/states.tpl.html', 'tables/tables.tpl.html', 'users/users.tpl.html']);

angular.module("about/about.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("about/about.tpl.html",
    "<h1>About</h1>\n" +
    "\n" +
    "<p>This is what this is about.</p>");
}]);

angular.module("account/account.invitations.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("account/account.invitations.tpl.html",
    "<div id=\"invitations\" ng-if=\"confirmations.length\">\n" +
    "<table >\n" +
    "    <tr>\n" +
    "        <td><h3>Od koho</h3></th>\n" +
    "        <td><h3>Aká rola</h3></th>\n" +
    "        <td><h3>Stav</h3></th>\n" +
    "        <td><h3>Vaše rozhodnutie</h3></th>\n" +
    "    </tr>\n" +
    "    <tr ng-repeat=\"confirmation in confirmations\">\n" +
    "        <td><h3>{{confirmation.createdBy.email}}</h3></td>\n" +
    "        <td><h3>{{confirmation.role}}</h3></td>\n" +
    "        <td><h3>{{confirmation.state}}</h3></td>\n" +
    "            <td ng-if=\"confirmation.state === 'V stave prijatia'\">\n" +
    "                <h3>\n" +
    "                    <button id=\"buttonTop\" ng-click=\"accept(confirmation)\">Prijať</button>\n" +
    "                    <button ng-click=\"reject(confirmation)\">Zamietnúť</button>\n" +
    "                </h3>\n" +
    "            </td>\n" +
    "        <td ng-if=\"confirmation.state === 'Prijaté'\">\n" +
    "            <h3>\n" +
    "                <button disabled>Prijal som</button>\n" +
    "            </h3>\n" +
    "        </td>\n" +
    "        <td ng-if=\"confirmation.state === 'Zamietnuté'\">\n" +
    "            <h3>\n" +
    "                <button disabled>Zamietnul som</button>\n" +
    "            </h3>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "</table>\n" +
    "</div>\n" +
    "<div ng-if=\"!confirmations.length\">\n" +
    "    <h3>Aktuálne nemáte žiadne pozvánky</h3>\n" +
    "</div>");
}]);

angular.module("account/account.options.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("account/account.options.tpl.html",
    "<div id=\"invitations\" >\n" +
    "    <table ng-repeat=\"client in clients\">\n" +
    "        <tr>\n" +
    "            <td>MENO</td>\n" +
    "            <td><input type=\"text\" ng-model=\"first_name\" placeholder=\"{{client.firstName}}\"></td>\n" +
    "            <td><button ng-click=\"editName(client._id,first_name,'firstName')\">Upraviť</button></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>PRIEZVISKO</td>\n" +
    "            <td><input type=\"text\" ng-model=\"last_name\" placeholder=\"{{client.lastName}}\"></td>\n" +
    "            <td><button ng-click=\"editName(client._id,last_name,'lastName')\">Upraviť</button></td>\n" +
    "        </tr>\n" +
    "        <tr ng-show=\"client.password !== undefined\">\n" +
    "            <td ><input ng-model=\"oldPassword\" type=\"password\" placeholder=\"Staré heslo\"></td>\n" +
    "            <td ><input ng-model=\"password\" type=\"password\" placeholder=\"Nové heslo\"></td>\n" +
    "            <td><input ng-model=\"password2\" type=\"password\" placeholder=\"Nové heslo ešte raz\"></td>\n" +
    "        </tr>\n" +
    "        <tr ng-show=\"client.password !== undefined\">\n" +
    "            <td></td>\n" +
    "            <td><button ng-click=\"editPassword(oldPassword,password,password2)\">Potvrdiť</button></td>\n" +
    "            <td></td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>");
}]);

angular.module("account/account.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("account/account.tpl.html",
    "<h1 ng-repeat=\"client in clients\">Správa účtu používateľa <b>{{client.firstName}}</b> <b>{{client.lastName}}</b> <b>[{{client.email}}]</b></h1><br>\n" +
    "<div id=\"left\">\n" +
    "    <table id=\"menu\">\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" onclick=\"location.href='/home'\">Domovská stránka</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" ui-sref=\"account.options\">Zmeniť nastavenia účtu</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" ui-sref=\"account.invitations\" >Pozvánky</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>\n" +
    "<div id=\"center\" ui-view>\n" +
    "\n" +
    "</div>");
}]);

angular.module("admin/admin.invitations.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/admin.invitations.tpl.html",
    "<div id=\"invitations\" ng-if=\"createdByConfirmations.length\">\n" +
    "<table >\n" +
    "    <tr>\n" +
    "        <td><h3>Komu</h3></th>\n" +
    "        <td><h3>Aká rola</h3></th>\n" +
    "        <td><h3>Stav</h3></th>\n" +
    "        <td><h3></h3></th>\n" +
    "    </tr>\n" +
    "    <tr ng-repeat=\"confirmation in createdByConfirmations\">\n" +
    "        <td><h3>{{confirmation.addressedTo.email}}</h3></td>\n" +
    "        <td><h3>{{confirmation.role}}</h3></td>\n" +
    "        <td><h3>{{confirmation.state}}</h3></td>\n" +
    "            <td ng-if=\"confirmation.state === 'V stave prijatia'\">\n" +
    "                <h3>\n" +
    "                    <button id=\"buttonTop\" ng-click=\"resend(confirmation)\">Znova poslať</button>\n" +
    "                    <button ng-click=\"delete(confirmation)\">Zrušiť</button>\n" +
    "                </h3>\n" +
    "            </td>\n" +
    "        <td ng-if=\"confirmation.state === 'Prijaté'\">\n" +
    "            <h3>\n" +
    "                <button>Prijaté klientom</button>\n" +
    "            </h3>\n" +
    "        </td>\n" +
    "        <td ng-if=\"confirmation.state === 'Zamietnuté'\">\n" +
    "            <h3>\n" +
    "                <button>Zamietnuté klientom</button>\n" +
    "            </h3>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "</table>\n" +
    "</div>\n" +
    "<div ng-if=\"!createdByConfirmations.length\">\n" +
    "    <h3>Aktuálne nemáte žiadne poslané pozvánky</h3>\n" +
    "</div>");
}]);

angular.module("admin/admin.options.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/admin.options.tpl.html",
    "<div id=\"invitations\" >\n" +
    "    <table ng-repeat=\"client in clients\">\n" +
    "        <tr>\n" +
    "            <td>MENO</td>\n" +
    "            <td><input type=\"text\" ng-model=\"first_name\" placeholder=\"{{client.firstName}}\"></td>\n" +
    "            <td><button ng-click=\"editName(client._id,first_name,'firstName')\">Upraviť</button></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>PRIEZVISKO</td>\n" +
    "            <td><input type=\"text\" ng-model=\"last_name\" placeholder=\"{{client.lastName}}\"></td>\n" +
    "            <td><button ng-click=\"editName(client._id,last_name,'lastName')\">Upraviť</button></td>\n" +
    "        </tr>\n" +
    "        <tr ng-show=\"client.password !== undefined\">\n" +
    "            <td ><input ng-model=\"oldPassword\" type=\"password\" placeholder=\"Staré heslo\"></td>\n" +
    "            <td ><input ng-model=\"password\" type=\"password\" placeholder=\"Nové heslo\"></td>\n" +
    "            <td><input ng-model=\"password2\" type=\"password\" placeholder=\"Nové heslo ešte raz\"></td>\n" +
    "        </tr>\n" +
    "        <tr ng-show=\"client.password !== undefined\">\n" +
    "            <td></td>\n" +
    "            <td><button ng-click=\"editPassword(oldPassword,password,password2)\">Potvrdiť</button></td>\n" +
    "            <td></td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>");
}]);

angular.module("admin/admin.receivedInvitations.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/admin.receivedInvitations.tpl.html",
    "<div id=\"invitations\" ng-if=\"addressedToConfirmations.length\" >\n" +
    "    <span ng-if=\"receivedInvitations\">\n" +
    "    <table >\n" +
    "        <tr>\n" +
    "            <td><h3>Od koho</h3></th>\n" +
    "            <td><h3>Aká rola</h3></th>\n" +
    "            <td><h3>Stav</h3></th>\n" +
    "            <td><h3>Vaše rozhodnutie</h3></th>\n" +
    "        </tr>\n" +
    "        <tr ng-repeat=\"confirmation in addressedToConfirmations\">\n" +
    "            <td><h3>{{confirmation.createdBy.email}}</h3></td>\n" +
    "            <td><h3>{{confirmation.role}}</h3></td>\n" +
    "            <td><h3>{{confirmation.state}}</h3></td>\n" +
    "            <td ng-if=\"confirmation.state === 'V stave prijatia'\">\n" +
    "                <h3>\n" +
    "                    <button id=\"buttonTop\" ng-click=\"accept(confirmation)\">Prijať</button>\n" +
    "                    <button ng-click=\"reject(confirmation)\">Zamietnúť</button>\n" +
    "                </h3>\n" +
    "            </td>\n" +
    "            <td ng-if=\"confirmation.state === 'Prijaté'\">\n" +
    "                <h3>\n" +
    "                    <button disabled>Prijal som</button>\n" +
    "                </h3>\n" +
    "            </td>\n" +
    "            <td ng-if=\"confirmation.state === 'Zamietnuté'\">\n" +
    "                <h3>\n" +
    "                    <button disabled>Zamietnul som</button>\n" +
    "                </h3>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "        </span>\n" +
    "</div>\n" +
    "<div ng-if=\"!addressedToConfirmations.length\">\n" +
    "    <h3>Aktuálne nemáte žiadne pozvánky</h3>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-if=\"hasName\">\n" +
    "    <form ng-submit=\"registerClient(user)\">\n" +
    "        <table>\n" +
    "            <tr>\n" +
    "                <td><label>Meno</label></td>\n" +
    "                <td><input type=\"text\" ng-model=\"user.firstName\" required style=\"width: 200px;\"/></td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td><label>Priezvisko</label></td>\n" +
    "                <td><input type=\"text\" ng-model=\"user.lastName\" required style=\"width: 200px;\"/></td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td><label>Dátum narodenia</label></td>\n" +
    "                <td><input type=\"date\" ng-model=\"user.date\" required style=\"width: 200px;\"/></td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td><label>Pohlavie</label></td>\n" +
    "                <td>\n" +
    "                    <label for=\"input1\">Muž</label><input type=\"radio\" id=\"input1\" ng-model=\"user.sex\" name=\"radio\" required value=\"Muž\" />\n" +
    "                    <label for=\"input2\">Žena</label><input type=\"radio\" id=\"input2\" ng-model=\"user.sex\" name=\"radio\" value=\"Žena\" />\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td><input class=\"btn btn-alert\"  type=\"submit\" value=\"Potvrdiť údaje\"></td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("admin/admin.sendInvitation.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/admin.sendInvitation.tpl.html",
    "<div id=\"invitations\" >\n" +
    "    <table >\n" +
    "        <tr>\n" +
    "            <td><h3>Komu</h3></th>\n" +
    "            <td><h3>Aká rola</h3></th>\n" +
    "            <td><h3></h3></th>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><input type=\"email\" ng-model=\"userEmail\" placeholder=\"Zadajte e-mail\" required></td>\n" +
    "            <td>\n" +
    "                <select class=\"width\" ng-model=\"userRole\"\n" +
    "                        ng-options=\"role as role.label for role in roles\">\n" +
    "                </select>\n" +
    "            </td>\n" +
    "            <td><h3><button ng-click=\"sendInvitation()\">Odoslať</button></h3></td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>\n" +
    "");
}]);

angular.module("admin/admin.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/admin.tpl.html",
    "<h1 ng-repeat=\"client in clients\">Správa účtu používateľa <b>{{client.firstName}}</b> <b>{{client.lastName}}</b> <b>[{{client.email}}]</b></h1><br>\n" +
    "<div id=\"left\">\n" +
    "<table id=\"menu\">\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            <button class=\"btn btn-alert\" onclick=\"location.href='/home'\">Domovská stránka</button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            <button class=\"btn btn-alert\" ui-sref=\"admin.invitations\">Poslané pozvánky</button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            <button class=\"btn btn-alert\" ui-sref=\"admin.receivedInvitations\">Prijaté pozvánky</button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            <button class=\"btn btn-alert\" ui-sref=\"admin.sendInvitation\">Poslať pozvánku</button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            <button class=\"btn btn-alert\" ui-sref=\"admin.options\">Zmeniť nastavenia účtu</button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            <button class=\"btn btn-alert\" onclick=\"location.href='/rooms'\">Miestnosti</button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            <button class=\"btn btn-alert\" onclick=\"location.href='/parts'\">Časti miestnosti</button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            <button class=\"btn btn-alert\" onclick=\"location.href='/tables'\">Stoly</button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            <button class=\"btn btn-alert\" onclick=\"location.href='/states'\">Statusy</button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>\n" +
    "            <button class=\"btn btn-alert\" onclick=\"location.href='/seats'\">Sedadlá</button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "</table>\n" +
    "</div>\n" +
    "<div id=\"center\" ui-view>\n" +
    "\n" +
    "</div>");
}]);

angular.module("clients/clients.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("clients/clients.tpl.html",
    "<div layout=\"row\" layout-sm=\"column\" layout-align=\"start center\">\n" +
    "    <md-text-float label=\"Filtruj podľa textu...\" ng-model=\"SearchText\"></md-text-float>\n" +
    "    <h2>{{clients.length}} / {{(clients | filter: SearchText).length}}</h2>\n" +
    "</div>\n" +
    "<md-content>\n" +
    "    <md-card layout-padding>\n" +
    "        <md-toolbar class=\"md-theme-light\">\n" +
    "            <h1 class=\"md-toolbar-tools\">\n" +
    "                <span>Zoznam klientov uložených v databáze</span>\n" +
    "            </h1>\n" +
    "        </md-toolbar>\n" +
    "        <md-content>\n" +
    "            <md-list>\n" +
    "                <md-item ng-repeat=\"client in clients | filter: SearchText | orderBy:'client.lastName'\">\n" +
    "                    <md-item-content>\n" +
    "                        <div layout=\"column\">\n" +
    "                            <div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">\n" +
    "                                <md-text-float label=\"Priezvisko\" ng-model=\"client.lastName\" disabled></md-text-float>\n" +
    "                                <md-text-float label=\"Meno\" ng-model=\"client.firstName\" disabled></md-text-float>\n" +
    "                                <md-text-float label=\"E-mail\" ng-model=\"client.email\" disabled></md-text-float>\n" +
    "                                <md-text-float label=\"Dátum narodenia\" ng-model=\"client.date_of_birth\" disabled></md-text-float>\n" +
    "                            </div>\n" +
    "                            <div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">\n" +
    "                                <md-text-float label=\"Pohlavie\"  ng-model=\"client.sex\" disabled></md-text-float>\n" +
    "                                <md-text-float label=\"Rola\" ng-model=\"client.roles\" disabled></md-text-float>\n" +
    "                                <div layout=\"row\" layout-align=\"start center\">\n" +
    "                                    <span layout=\"center\"> Verifikovaný e-mail </span>\n" +
    "                                    <md-checkbox aria-label=\"{{client.verifiedEmail}}\" ng-model=\"client.verifiedEmail\"></md-checkbox>\n" +
    "                                </div>\n" +
    "                                <div layout=\"row\" layout-sm=\"column\" layout-margin layout-align=\"left center\">\n" +
    "                                    <md-button class=\"md-raised md-warn\" ng-click=\"DeleteClient(client)\"> Vymazať </md-button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </md-item-content>\n" +
    "                    <!--<md-divider ng-if=\"!$last\"></md-divider>-->\n" +
    "                </md-item>\n" +
    "            </md-list>\n" +
    "        </md-content>\n" +
    "    </md-card>\n" +
    "</md-content>");
}]);

angular.module("forgotPassword/forgotPassword.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("forgotPassword/forgotPassword.tpl.html",
    "<style>\n" +
    "    td\n" +
    "    {\n" +
    "        padding-bottom: 10px;\n" +
    "    }\n" +
    "\n" +
    "</style>\n" +
    "<div ng-show=\"resetForm\">\n" +
    "<h4>\n" +
    "    Ak ste zabudli svoje heslo, vložte svoj e-mail na, ktorý Vám príde odkaz pre vloženie nového hesla.\n" +
    "</h4>\n" +
    "\n" +
    "<form ng-submit=\"ResetPassword()\">\n" +
    "    <table>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <label>E-mail</label>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <input type=\"email\" ng-model=\"email\" required/>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <input class=\"btn btn-alert\" type=\"submit\" value=\"Resetovať heslo\">\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "    </table>\n" +
    "</form>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div ng-show=\"addNewPasswordForm\">\n" +
    "    <h4>\n" +
    "        Zadajte nove heslo pre svoj účet!\n" +
    "    </h4>\n" +
    "\n" +
    "    <form ng-submit=\"addNewPassword()\">\n" +
    "        <table>\n" +
    "            <tr>\n" +
    "                <td>\n" +
    "                    <label>Heslo</label>\n" +
    "                </td>\n" +
    "                <td>\n" +
    "                    <input type=\"password\" ng-model=\"password\" required/>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td>\n" +
    "                    <label>Potvrdenie hesla</label>\n" +
    "                </td>\n" +
    "                <td>\n" +
    "                    <input type=\"password\" ng-model=\"password2\" required/>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td>\n" +
    "                    <input class=\"btn btn-alert\" type=\"submit\" value=\"Potvrdiť\">\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div layout=\"row\" layout-margin layout-fill layout-padding ng-repeat=\"room in rooms\" layout-align=\"{{room.positioning}}\"><!--Rooms-->\n" +
    "\n" +
    "    <div ng-repeat=\"part in room.parts\"  layout=\"column\" layout-align=\"{{part.positioning}}\" flex><!--Parts-->\n" +
    "\n" +
    "        <div  ng-if=\"part.tables.length\" ng-repeat=\"table in part.tables\"   class=\"table\"  ><!--Tables-->\n" +
    "            <div ng-repeat=\"all_table in tables\" ng-if=\"table == all_table._id\" class=\"tableWrapper pull-left \">\n" +
    "\n" +
    "                <!-----------------------------------------------------------Vrchna cast stola------------------------------------------>\n" +
    "                <div class=\"seats seatsTop\"><!--Seats-->\n" +
    "                    <span ng-show=\"all_table.seats.length\" ng-repeat=\"seat in all_table.seats\"  ng-if=\"(seat.order-1) < (all_table.seats.length/2)\"><!--Z daneho stola filtrujeme sedadla-->\n" +
    "                        <span ng-repeat=\"state in states\" ng-if=\"state._id == seat.state\"><!--Filtrujeme stav sedadla-->\n" +
    "\n" +
    "                            <!--Ak nie je uzivatel prihlaseny tak odokry udaje-->\n" +
    "                            <span ng-if=\"!isLogged\">\n" +
    "                                <!--Ak je rezervovany alebo zaplateny tak ukaz OBSADENY-->\n" +
    "                                <md-button aria-label=\"\" ng-if=\"state.color == 'green' \" class=\"md-fab md-primary seat md-warn seat\" >\n" +
    "                                    <span>\n" +
    "                                        <img src='/assets/svg/design/ic_person_18px.svg'>\n" +
    "                                    </span>\n" +
    "                                    <md-tooltip>\n" +
    "                                        {{(seat.below_18)?\"Osoba má viac ako 18 rokov!\":\"Osoba má menej ako 18 rokov\"}}\n" +
    "                                    </md-tooltip>\n" +
    "                                </md-button>\n" +
    "                                <md-button aria-label=\"\" ng-if=\"state.color == 'yellow'\" class=\"md-fab md-primary seat md-warn seat\" >\n" +
    "                                <span>\n" +
    "                                    <img src='/assets/svg/design/ic_person_18px.svg'>\n" +
    "                                </span>\n" +
    "                                    <md-tooltip>\n" +
    "                                        {{(seat.below_18)?\"Osoba má viac ako 18 rokov!\":\"Osoba má menej ako 18 rokov\"}}\n" +
    "                                    </md-tooltip>\n" +
    "                                </md-button>\n" +
    "                            </span>\n" +
    "\n" +
    "                          <!--Ak je uzivatel prihlaseny tak hladaj jeho udaje-->\n" +
    "                            <span ng-if=\"isLogged\" ng-repeat=\"client in clients\" >\n" +
    "\n" +
    "                                <!--Vyhladavanie sedadiel z prihlaseneho e-mailu-->\n" +
    "                                <span ng-if=\"client.email == clientEmail\" ng-repeat=\"profile in client.profile\"><!--Ak uz najdeme klienta, tak hladame jeho ludi-->\n" +
    "\n" +
    "                                    <span ng-if=\"profile._id == seat.profile\"><!--Ak sme nasli cloveka komu patri sedadlo s danym klientom-->\n" +
    "                                        <!--Ak je rezervovany-->\n" +
    "                                        <md-button aria-label=\"\"  ng-if=\"state.color == 'yellow'\" ng-click=\"showReservation($event,seat)\" class=\"md-fab md-primary seat\" md-theme=\"{{state.color}}\">\n" +
    "                                            <span><img src='/assets/svg/design/ic_person_18px.svg'></span>\n" +
    "                                        </md-button>\n" +
    "                                        <!--Ak je Zaplateny-->\n" +
    "                                        <md-button aria-label=\"\" ng-if=\"state.color == 'green'\" ng-click=\"showReservation($event,seat)\" class=\"md-fab md-primary seat\" md-theme=\"{{state.color}}\">\n" +
    "                                            <span><img src='/assets/svg/ic_check_18px.svg'></span>\n" +
    "                                            <md-tooltip>\n" +
    "                                                Vaše sedadlo\n" +
    "                                            </md-tooltip>\n" +
    "                                        </md-button>\n" +
    "                                    </span>\n" +
    "                                </span>\n" +
    "\n" +
    "                                <!--Vyhladavanie sedadiel z ostatnych e-mailov-->\n" +
    "                                <span ng-if=\"client.email != clientEmail\" ng-repeat=\"profile in client.profile\"><!--Ak uz najdeme klienta, tak hladame jeho ludi-->\n" +
    "\n" +
    "                                    <span ng-if=\"profile._id == seat.profile\"><!--Ak sme nasli cloveka komu patri sedadlo s danym klientom-->\n" +
    "                                        <!--Ak je rezervovany dame obsadeny-->\n" +
    "                                        <md-button aria-label=\"\"  ng-if=\"state.color == 'yellow'\" class=\"md-fab md-primary seat md-warn seat\" >\n" +
    "                                            <span>\n" +
    "                                                <img src='/assets/svg/design/ic_person_18px.svg'>\n" +
    "                                            </span>\n" +
    "                                            <md-tooltip>\n" +
    "                                                {{(seat.below_18)?\"Osoba má viac ako 18 rokov!\":\"Osoba má menej ako 18 rokov\"}}\n" +
    "                                            </md-tooltip>\n" +
    "                                        </md-button>\n" +
    "                                        <!--Ak je Zaplateny dame obsadeny-->\n" +
    "                                        <md-button aria-label=\"\" ng-if=\"state.color == 'green'\" class=\"md-fab md-primary seat md-warn seat\" >\n" +
    "                                            <span>\n" +
    "                                                <img src='/assets/svg/design/ic_person_18px.svg'>\n" +
    "                                            </span>\n" +
    "                                            <md-tooltip>\n" +
    "                                                {{(seat.below_18)?\"Osoba má viac ako 18 rokov!\":\"Osoba má menej ako 18 rokov\"}}\n" +
    "                                            </md-tooltip>\n" +
    "                                        </md-button>\n" +
    "\n" +
    "                                    </span>\n" +
    "                                </span>\n" +
    "                            </span>\n" +
    "\n" +
    "                            <!--Ak je volny, ponechaj VOLNY-->\n" +
    "\n" +
    "                            <md-button aria-label=\"\" ng-if=\"state.color == 'grey'\" ng-click=\"showReservation($event,seat)\" class=\"md-fab md-primary seat\" md-theme=\"{{state.color}}\">\n" +
    "\n" +
    "\n" +
    "                                {{seat.order}}\n" +
    "                            </md-button>\n" +
    "\n" +
    "                        </span>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "                <md-card md-whiteframe layout layout-align=\"center center\"   class=\"tableCenter md-primary clearfix\">Stôl {{all_table.order}} </md-card>\n" +
    "\n" +
    "                <!--------------------------------Spodna cast stola------------------------------------------------------------->\n" +
    "                <div class=\"seats seatsBottom clearfix\">\n" +
    "\n" +
    "                    <span ng-show=\"all_table.seats.length\" ng-repeat=\"seat in all_table.seats\" ng-if=\"(seat.order-1) >= (all_table.seats.length/2)\">\n" +
    "                        <span ng-repeat=\"state in states\" ng-if=\"state._id == seat.state\">\n" +
    "\n" +
    "                            <!--Ak nie je uzivatel prihlaseny tak odokry udaje-->\n" +
    "                            <span ng-if=\"!isLogged\">\n" +
    "                            <!--Ak je rezervovany alebo zaplateny tak ukaz OBSADENY-->\n" +
    "                                <md-button aria-label=\"\" ng-if=\"state.color == 'green' \" class=\"md-fab md-primary seat md-warn seat\" >\n" +
    "                                    <span>\n" +
    "                                        <img src='/assets/svg/design/ic_person_18px.svg'>\n" +
    "                                    </span>\n" +
    "                                    <md-tooltip>\n" +
    "                                        {{(seat.below_18)?\"Osoba má viac ako 18 rokov!\":\"Osoba má menej ako 18 rokov\"}}\n" +
    "                                    </md-tooltip>\n" +
    "                                </md-button>\n" +
    "                                <md-button aria-label=\"\" ng-if=\"state.color == 'yellow'\" class=\"md-fab md-primary seat md-warn seat\" >\n" +
    "                                <span>\n" +
    "                                    <img src='/assets/svg/design/ic_person_18px.svg'>\n" +
    "                                </span>\n" +
    "                                    <md-tooltip>\n" +
    "                                        {{(seat.below_18)?\"Osoba má viac ako 18 rokov!\":\"Osoba má menej ako 18 rokov\"}}\n" +
    "                                    </md-tooltip>\n" +
    "                                </md-button>\n" +
    "                            </span>\n" +
    "\n" +
    "                          <!--Ak je uzivatel prihlaseny tak hladaj jeho udaje-->\n" +
    "                            <span ng-if=\"isLogged\" ng-repeat=\"client in clients\" >\n" +
    "\n" +
    "                                <!--Vyhladavanie sedadiel z prihlaseneho e-mailu-->\n" +
    "                                <span ng-if=\"client.email == clientEmail\" ng-repeat=\"profile in client.profile\"><!--Ak uz najdeme klienta, tak hladame jeho ludi-->\n" +
    "\n" +
    "                                    <span ng-if=\"profile._id == seat.profile\"><!--Ak sme nasli cloveka komu patri sedadlo s danym klientom-->\n" +
    "                                        <!--Ak je rezervovany-->\n" +
    "                                        <md-button aria-label=\"\"  ng-if=\"state.color == 'yellow'\" ng-click=\"showReservation($event,seat)\" class=\"md-fab md-primary seat\" md-theme=\"{{state.color}}\">\n" +
    "                                            <span><img src='/assets/svg/design/ic_person_18px.svg'></span>\n" +
    "                                        </md-button>\n" +
    "                                        <!--Ak je Zaplateny-->\n" +
    "                                        <md-button aria-label=\"\" ng-if=\"state.color == 'green'\" ng-click=\"showReservation($event,seat)\" class=\"md-fab md-primary seat\" md-theme=\"{{state.color}}\">\n" +
    "                                            <span><img src='/assets/svg/ic_check_18px.svg'></span>\n" +
    "                                            <md-tooltip>\n" +
    "                                                Vaše sedadlo\n" +
    "                                            </md-tooltip>\n" +
    "                                        </md-button>\n" +
    "                                    </span>\n" +
    "                                </span>\n" +
    "\n" +
    "                                <!--Vyhladavanie sedadiel z ostatnych e-mailov-->\n" +
    "                                <span ng-if=\"client.email != clientEmail\" ng-repeat=\"profile in client.profile\"><!--Ak uz najdeme klienta, tak hladame jeho ludi-->\n" +
    "\n" +
    "                                    <span ng-if=\"profile._id == seat.profile\"><!--Ak sme nasli cloveka komu patri sedadlo s danym klientom-->\n" +
    "                                        <!--Ak je rezervovany dame obsadeny-->\n" +
    "                                        <md-button aria-label=\"\"  ng-if=\"state.color == 'yellow'\" class=\"md-fab md-primary seat md-warn seat\" >\n" +
    "                                            <span>\n" +
    "                                                <img src='/assets/svg/design/ic_person_18px.svg'>\n" +
    "                                            </span>\n" +
    "                                            <md-tooltip>\n" +
    "                                                {{(seat.below_18)?\"Osoba má viac ako 18 rokov!\":\"Osoba má menej ako 18 rokov\"}}\n" +
    "                                            </md-tooltip>\n" +
    "                                        </md-button>\n" +
    "                                        <!--Ak je Zaplateny dame obsadeny-->\n" +
    "                                        <md-button aria-label=\"\" ng-if=\"state.color == 'green'\" class=\"md-fab md-primary seat md-warn seat\" >\n" +
    "                                            <span>\n" +
    "                                                <img src='/assets/svg/design/ic_person_18px.svg'>\n" +
    "                                            </span>\n" +
    "                                            <md-tooltip>\n" +
    "                                                {{(seat.below_18)?\"Osoba má viac ako 18 rokov!\":\"Osoba má menej ako 18 rokov\"}}\n" +
    "                                            </md-tooltip>\n" +
    "                                        </md-button>\n" +
    "                                    </span>\n" +
    "                                </span>\n" +
    "                            </span>\n" +
    "\n" +
    "                            <!--Ak je volny, ponechaj VOLNY-->\n" +
    "                            <md-button aria-label=\"\" ng-if=\"state.color == 'grey'\" ng-click=\"showReservation($event,seat)\" class=\"md-fab md-primary seat\" md-theme=\"{{state.color}}\">\n" +
    "                                {{seat.order}}\n" +
    "                            </md-button>\n" +
    "\n" +
    "                        </span>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("invitation/invitation.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("invitation/invitation.tpl.html",
    "<style>\n" +
    "    td\n" +
    "    {\n" +
    "        width:150px;\n" +
    "        padding-bottom: 10px;\n" +
    "    }\n" +
    "</style>\n" +
    "<div ng-show=\"registerForm\">\n" +
    "<h4>Vložte svoje údaje pre zaregistrovanie sa ako <b ng-model=\"role\">{{role}}</b></h4>\n" +
    "<form ng-submit=\"register()\">\n" +
    "    <table>\n" +
    "        <tr>\n" +
    "            <td><label>Meno</label></td>\n" +
    "            <td><input type=\"text\" ng-model=\"firstName\" required style=\"width: 200px;\"/></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><label>Priezvisko</label></td>\n" +
    "            <td><input type=\"text\" ng-model=\"lastName\" required style=\"width: 200px;\"/></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><label>E-mail</label></td>\n" +
    "            <td><input type=\"email\" ng-model=\"email\" disabled style=\"width: 200px;\"/></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><label>Heslo</label></td>\n" +
    "            <td><input type=\"password\" ng-model=\"password\" required style=\"width: 200px;\"/></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><label>Potvrdenie hesla</label></td>\n" +
    "            <td><input type=\"password\" ng-model=\"password2\" required style=\"width: 200px;\"/></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><label>Dátum narodenia</label></td>\n" +
    "            <td><input type=\"date\" ng-model=\"date\" required style=\"width: 200px;\"/></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><label>Pohlavie</label></td>\n" +
    "            <td>\n" +
    "                <label for=\"input1\">Muž</label><input type=\"radio\" id=\"input1\" ng-model=\"sex\" name=\"radio\" required value=\"Muž\" />\n" +
    "                <label for=\"input2\">Žena</label><input type=\"radio\" id=\"input2\" ng-model=\"sex\" name=\"radio\" value=\"Žena\" />\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><input class=\"btn btn-alert\"  type=\"submit\" value=\"Registrovat sa\"></td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</form>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-show=\"form\">\n" +
    "    <h4>Vitajte <b>{{firstName+\" \"+lastName}}</b></h4>\n" +
    "    <form ng-submit=\"registerOldUser(user)\">\n" +
    "        <input type=\"checkbox\" ng-model=\"agreeCheckBox\" required>&nbsp;\n" +
    "        <label>Súhlasím s tým, aby mi bola pridaná rola ako {{role}}</label><br>\n" +
    "            <input class=\"btn btn-alert\"  type=\"submit\" value=\"Potvrdiť\">\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-show=\"registerMainAdminForm\">\n" +
    "    <h4>Vložte svoje údaje pre zaregistrovanie sa ako <b ng-model=\"role\">{{role}}</b></h4>\n" +
    "    <form ng-submit=\"registerMainAdmin()\">\n" +
    "        <table>\n" +
    "            <tr>\n" +
    "                <td><label>Meno</label></td>\n" +
    "                <td><input type=\"text\" ng-model=\"firstName\" required style=\"width: 200px;\"/></td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td><label>Priezvisko</label></td>\n" +
    "                <td><input type=\"text\" ng-model=\"lastName\" required style=\"width: 200px;\"/></td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td><label>E-mail</label></td>\n" +
    "                <td><input type=\"email\" ng-model=\"email\" disabled style=\"width: 200px;\"/></td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td><label>Dátum narodenia</label></td>\n" +
    "                <td><input type=\"date\" ng-model=\"date\" required style=\"width: 200px;\"/></td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td><label>Pohlavie</label></td>\n" +
    "                <td>\n" +
    "                    <label for=\"input1\">Muž</label><input type=\"radio\" id=\"input1\" ng-model=\"sex\" name=\"radio\" required value=\"Muž\" />\n" +
    "                    <label for=\"input2\">Žena</label><input type=\"radio\" id=\"input2\" ng-model=\"sex\" name=\"radio\" value=\"Žena\" />\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <td><input class=\"btn btn-alert\"  type=\"submit\" value=\"Registrovat sa\"></td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "    </form>\n" +
    "</div>");
}]);

angular.module("login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.tpl.html",
    "<style>\n" +
    "    td\n" +
    "    {\n" +
    "        padding-bottom: 10px;\n" +
    "    }\n" +
    "\n" +
    "</style>\n" +
    "<h3>Prihlásenie do systému T-res</h3>\n" +
    "<form ng-submit=\"Login()\">\n" +
    "    <!-- this input field synchronizes directly to the name attribute in Firebase! -->\n" +
    "    <table>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <label>E-mail:</label>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <input type=\"text\" name=\"email\" ng-model=\"user.email\" required/>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <label>Heslo:</label>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <input type=\"password\" name=\"password\" ng-model=\"user.password\" required/>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <input class=\"btn btn-alert\" type=\"submit\" value=\"Prihlásiť sa\">\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "    <p>Nie ste este zaregistrovany?<a href=\"/register\"> Registrovať sa!</a> </p>\n" +
    "    <p><a href=\"/forgotPassword\" >Zabudli ste svoje heslo?</a></p>\n" +
    "\n" +
    "</form>\n" +
    "\n" +
    "");
}]);

angular.module("manager/manager.invitations.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("manager/manager.invitations.tpl.html",
    "<div id=\"invitations\" ng-if=\"createdByConfirmations.length\">\n" +
    "<table >\n" +
    "    <tr>\n" +
    "        <td><h3>Komu</h3></th>\n" +
    "        <td><h3>Aká rola</h3></th>\n" +
    "        <td><h3>Stav</h3></th>\n" +
    "        <td><h3></h3></th>\n" +
    "    </tr>\n" +
    "    <tr ng-repeat=\"confirmation in createdByConfirmations\">\n" +
    "        <td><h3>{{confirmation.addressedTo.email}}</h3></td>\n" +
    "        <td><h3>{{confirmation.role}}</h3></td>\n" +
    "        <td><h3>{{confirmation.state}}</h3></td>\n" +
    "            <td ng-if=\"confirmation.state === 'V stave prijatia'\">\n" +
    "                <h3>\n" +
    "                    <button id=\"buttonTop\" ng-click=\"resend(confirmation)\">Znova poslať</button>\n" +
    "                    <button ng-click=\"delete(confirmation)\">Zrušiť</button>\n" +
    "                </h3>\n" +
    "            </td>\n" +
    "        <td ng-if=\"confirmation.state === 'Prijaté'\">\n" +
    "            <h3>\n" +
    "                <button>Prijaté klientom</button>\n" +
    "            </h3>\n" +
    "        </td>\n" +
    "        <td ng-if=\"confirmation.state === 'Zamietnuté'\">\n" +
    "            <h3>\n" +
    "                <button>Zamietnuté klientom</button>\n" +
    "            </h3>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "</table>\n" +
    "</div>\n" +
    "<div ng-if=\"!createdByConfirmations.length\">\n" +
    "    <h3>Aktuálne nemáte žiadne poslané pozvánky</h3>\n" +
    "</div>");
}]);

angular.module("manager/manager.options.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("manager/manager.options.tpl.html",
    "<div id=\"invitations\" >\n" +
    "    <table ng-repeat=\"client in clients\">\n" +
    "        <tr>\n" +
    "            <td>MENO</td>\n" +
    "            <td><input type=\"text\" ng-model=\"first_name\" placeholder=\"{{client.firstName}}\"></td>\n" +
    "            <td><button ng-click=\"editName(client._id,first_name,'firstName')\">Upraviť</button></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>PRIEZVISKO</td>\n" +
    "            <td><input type=\"text\" ng-model=\"last_name\" placeholder=\"{{client.lastName}}\"></td>\n" +
    "            <td><button ng-click=\"editName(client._id,last_name,'lastName')\">Upraviť</button></td>\n" +
    "        </tr>\n" +
    "        <tr ng-show=\"client.password !== undefined\">\n" +
    "            <td ><input ng-model=\"oldPassword\" type=\"password\" placeholder=\"Staré heslo\"></td>\n" +
    "            <td ><input ng-model=\"password\" type=\"password\" placeholder=\"Nové heslo\"></td>\n" +
    "            <td><input ng-model=\"password2\" type=\"password\" placeholder=\"Nové heslo ešte raz\"></td>\n" +
    "        </tr>\n" +
    "        <tr ng-show=\"client.password !== undefined\">\n" +
    "            <td></td>\n" +
    "            <td><button ng-click=\"editPassword(oldPassword,password,password2)\">Potvrdiť</button></td>\n" +
    "            <td></td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>");
}]);

angular.module("manager/manager.receivedInvitations.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("manager/manager.receivedInvitations.tpl.html",
    "<div id=\"invitations\" ng-if=\"addressedToConfirmations.length\">\n" +
    "    <table >\n" +
    "        <tr>\n" +
    "            <td><h3>Od koho</h3></th>\n" +
    "            <td><h3>Aká rola</h3></th>\n" +
    "            <td><h3>Stav</h3></th>\n" +
    "            <td><h3>Vaše rozhodnutie</h3></th>\n" +
    "        </tr>\n" +
    "        <tr ng-repeat=\"confirmation in addressedToConfirmations\">\n" +
    "            <td><h3>{{confirmation.createdBy.email}}</h3></td>\n" +
    "            <td><h3>{{confirmation.role}}</h3></td>\n" +
    "            <td><h3>{{confirmation.state}}</h3></td>\n" +
    "            <td ng-if=\"confirmation.state === 'V stave prijatia'\">\n" +
    "                <h3>\n" +
    "                    <button id=\"buttonTop\" ng-click=\"accept(confirmation)\">Prijať</button>\n" +
    "                    <button ng-click=\"reject(confirmation)\">Zamietnúť</button>\n" +
    "                </h3>\n" +
    "            </td>\n" +
    "            <td ng-if=\"confirmation.state === 'Prijaté'\">\n" +
    "                <h3>\n" +
    "                    <button disabled>Prijal som</button>\n" +
    "                </h3>\n" +
    "            </td>\n" +
    "            <td ng-if=\"confirmation.state === 'Zamietnuté'\">\n" +
    "                <h3>\n" +
    "                    <button disabled>Zamietnul som</button>\n" +
    "                </h3>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>\n" +
    "<div ng-if=\"!addressedToConfirmations.length\">\n" +
    "    <h3>Aktuálne nemáte žiadne pozvánky</h3>\n" +
    "</div>");
}]);

angular.module("manager/manager.sendInvitation.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("manager/manager.sendInvitation.tpl.html",
    "<div id=\"invitations\" >\n" +
    "    <table >\n" +
    "        <tr>\n" +
    "            <td><h3>Komu</h3></th>\n" +
    "            <td><h3>Aká rola</h3></th>\n" +
    "            <td><h3></h3></th>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><input type=\"email\" ng-model=\"userEmail\" placeholder=\"Zadajte e-mail\" required></td>\n" +
    "            <td>\n" +
    "                <select class=\"width\" ng-model=\"userRole\"\n" +
    "                        ng-options=\"role as role.label for role in roles\">\n" +
    "                </select>\n" +
    "            </td>\n" +
    "            <td><h3><button ng-click=\"sendInvitation()\">Odoslať</button></h3></td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>\n" +
    "");
}]);

angular.module("manager/manager.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("manager/manager.tpl.html",
    "<h1 ng-repeat=\"client in clients\">Správa účtu používateľa <b>{{client.firstName}}</b> <b>{{client.lastName}}</b> <b>[{{client.email}}]</b></h1><br>\n" +
    "<div id=\"left\">\n" +
    "    <table id=\"menu\">\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" onclick=\"location.href='/home'\">Domovská stránka</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" ui-sref=\"manager.invitations\">Poslané pozvánky</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" ui-sref=\"manager.receivedInvitations\">Prijaté pozvánky</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" ui-sref=\"manager.sendInvitation\">Poslať pozvánku</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" ui-sref=\"manager.options\">Zmeniť nastavenia účtu</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" onclick=\"location.href='/clients'\">Klienti</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" onclick=\"location.href='/profiles'\">Profily klientov</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" onclick=\"location.href='/rooms'\">Miestnosti</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" onclick=\"location.href='/parts'\">Časti miestnosti</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" onclick=\"location.href='/tables'\">Stoly</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" onclick=\"location.href='/states'\">Statusy</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>\n" +
    "                <button class=\"btn btn-alert\" onclick=\"location.href='/seats'\">Sedadlá</button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>\n" +
    "<div id=\"center\" ui-view>\n" +
    "</div>");
}]);

angular.module("parts/parts.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("parts/parts.tpl.html",
    "<div layout=\"row\" layout-sm=\"column\" layout-align=\"start center\">\n" +
    "    <md-text-float label=\"Zadaj text pre filtráciu\" ng-model=\"SearchText\"></md-text-float>\n" +
    "    <h2>{{parts.length}} / {{(parts | filter: SearchText).length}}</h2>\n" +
    "</div>\n" +
    "<br/>\n" +
    "<md-content>\n" +
    "    <md-card layout-padding>\n" +
    "        <md-toolbar class=\"md-theme-light\">\n" +
    "            <h1 class=\"md-toolbar-tools\">\n" +
    "                <span>List častí miestnosti v Databáze</span>\n" +
    "            </h1>\n" +
    "        </md-toolbar>\n" +
    "        <md-content>\n" +
    "            <md-list>\n" +
    "                <md-item ng-repeat=\"part in parts | filter: SearchText | orderBy:'part.order'\">\n" +
    "                    <md-item-content >\n" +
    "                        <div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">\n" +
    "                            <md-text-float label=\"Poradie časti v miestnosti\" ng-model=\"part.order\" disabled></md-text-float>\n" +
    "                            <md-text-float label=\"Názov časti v miestnosti\" ng-model=\"part.name\" disabled></md-text-float>\n" +
    "                            <md-text-float label=\"Pozícia časti v miestnosti slovom\" ng-model=\"part.positioning\" disabled></md-text-float>\n" +
    "                            <span> Miestnosť: </span>\n" +
    "                            <select ng-init=\"changePart.room = rooms[part.room.order]\" ng-model=\"changePart.room\" ng-options=\"room.name for room in rooms\" required></select>\n" +
    "                            <div layout=\"row\" layout-sm=\"column\" layout-margin layout-align=\"left center\">\n" +
    "                                <md-button class=\"md-raised md-primary\" ng-click=\"SavePart(part, changePart)\"> Uložiť </md-button>\n" +
    "                                <md-button class=\"md-raised\" ng-click=\"CleanPart(part)\"> Vyčistiť </md-button>\n" +
    "                                <md-button class=\"md-raised md-warn\" ng-click=\"DeletePart(part)\"> Vymazať </md-button>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </md-item-content>\n" +
    "                    <!--<md-divider ng-if=\"!$last\"></md-divider>-->\n" +
    "                </md-item>\n" +
    "            </md-list>\n" +
    "        </md-content>\n" +
    "    </md-card>\n" +
    "</md-content>\n" +
    "\n" +
    "<md-content>\n" +
    "    <md-card layout-padding>\n" +
    "        <md-toolbar class=\"md-theme-light\">\n" +
    "            <h1 class=\"md-toolbar-tools\">\n" +
    "                <span>Uložiť novú časť miestnosti do Databázy</span>\n" +
    "            </h1>\n" +
    "        </md-toolbar>\n" +
    "        <div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">\n" +
    "            <md-text-float label=\"Názov časti v miestnosti\" ng-model=\"newPart.name\" disabled></md-text-float>\n" +
    "            <md-text-float label=\"Pozícia časti v miestnosti slovom\" ng-model=\"newPart.positioning\" disabled></md-text-float>\n" +
    "            <span> Miestnosť: </span>\n" +
    "            <select ng-model=\"newPart.room\" ng-options=\"room.name for room in rooms\" required></select>\n" +
    "            <md-button class=\"md-raised md-primary\" ng-click=\"AddPart(newPart)\">Vytvoriť</md-button>\n" +
    "        </div>\n" +
    "    </md-card>\n" +
    "</md-content>");
}]);

angular.module("profiles/profiles.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("profiles/profiles.tpl.html",
    "<div layout=\"row\" layout-sm=\"column\" layout-align=\"start center\">\n" +
    "    <md-text-float label=\"Filtruj podľa textu...\" ng-model=\"SearchText\"></md-text-float>\n" +
    "    <h2>{{profiles.length}} / {{(profiles | filter: SearchText).length}}</h2>\n" +
    "</div>\n" +
    "<md-content>\n" +
    "    <md-card layout-padding>\n" +
    "        <md-toolbar class=\"md-theme-light\">\n" +
    "            <h1 class=\"md-toolbar-tools\">\n" +
    "                <span>Zoznam profilov osôb uložených v Databáze</span>\n" +
    "            </h1>\n" +
    "        </md-toolbar>\n" +
    "        <md-content>\n" +
    "            <md-list>\n" +
    "                <md-item ng-repeat=\"profile in profiles | filter: SearchText | orderBy:'last_name'\">\n" +
    "                    <md-item-content>\n" +
    "                        <!--<div layout=\"column\">-->\n" +
    "                            <!--<div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">-->\n" +
    "                            <!--&lt;!&ndash;<span> Miesto: </span>&ndash;&gt;-->\n" +
    "                            <!--&lt;!&ndash;<select ng-init=\"changeSeat.state = states[seat.state.num]\" ng-model=\"changeSeat.state\" ng-options=\"state.name for state in states\" required></select>&ndash;&gt;-->\n" +
    "                            <!--&lt;!&ndash;<span> Stôl číslo: </span>&ndash;&gt;-->\n" +
    "                            <!--&lt;!&ndash;<select ng-init=\"changeSeat.table = tables[seat.table.order]\" ng-model=\"changeSeat.table\" ng-options=\"table.order for table in tables\" required></select>&ndash;&gt;-->\n" +
    "                        <!--</div>-->\n" +
    "                        <div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">\n" +
    "                            <md-text-float label=\"Krstné meno\" ng-model=\"profile.first_name\" disabled></md-text-float>\n" +
    "                            <md-text-float label=\"Priezvisko\" ng-model=\"profile.last_name\" disabled></md-text-float>\n" +
    "                            <md-text-float label=\"eMail\" ng-model=\"profile.email\" disabled></md-text-float>\n" +
    "                            <md-text-float label=\"Mobil\" ng-model=\"profile.mobil\" disabled></md-text-float>\n" +
    "                            <span layout=\"center\"> Viac ako 18 rokov: </span>\n" +
    "                            <md-checkbox aria-label=\"{{profile.under_18}}\" ng-model=\"profile.under_18\"></md-checkbox>\n" +
    "                            <div layout=\"row\" layout-align=\"start center\">\n" +
    "                                <md-button class=\"btn btn-info\" ng-click=\"SaveProfile(profile, changeProfile)\">Uložiť</md-button>\n" +
    "                                <md-button class=\"btn btn-primary\" ng-click=\"CleanProfile(profile)\">Vyčistiť</md-button>\n" +
    "                                <md-button class=\"btn btn-danger\" ng-click=\"DeleteProfile(profile)\">Vymazať</md-button>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </md-item-content>\n" +
    "                </md-item>\n" +
    "            </md-list>\n" +
    "        </md-content>\n" +
    "    </md-card>\n" +
    "</md-content>\n" +
    "\n" +
    "<md-content>\n" +
    "    <md-card layout-padding>\n" +
    "        <md-toolbar class=\"md-theme-light\">\n" +
    "            <h1 class=\"md-toolbar-tools\">\n" +
    "                <span>Uložiť nový profile do Databázy</span>\n" +
    "            </h1>\n" +
    "        </md-toolbar>\n" +
    "        <div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">\n" +
    "            <md-text-float label=\"Krstné meno\" ng-model=\"addProfile.first_name\" disabled></md-text-float>\n" +
    "            <md-text-float label=\"Priezvisko\" ng-model=\"addProfile.last_name\" disabled></md-text-float>\n" +
    "            <md-text-float label=\"eMail\" ng-model=\"addProfile.email\" disabled></md-text-float>\n" +
    "            <md-text-float label=\"Mobil\" ng-model=\"addProfile.mobil\" disabled></md-text-float>\n" +
    "            <span layout=\"center\"> Viac ako 18 rokov: </span>\n" +
    "            <md-checkbox aria-label=\"{{addProfile.under_18}}\" ng-model=\"addProfile.under_18\"></md-checkbox>\n" +
    "            <div layout=\"row\" layout-align=\"start center\">\n" +
    "                <md-button class=\"btn btn-info\" ng-click=\"AddSeat(addProfile)\">Vytvoriť</md-button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </md-card>\n" +
    "</md-content>");
}]);

angular.module("register/register.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("register/register.tpl.html",
    "<style>\n" +
    "    td\n" +
    "    {\n" +
    "        width:150px;\n" +
    "        padding-bottom: 10px;\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "<h3>Registrácia </h3>\n" +
    "<form ng-submit=\"register(user)\">\n" +
    "    <table>\n" +
    "        <tr>\n" +
    "            <td><label>Meno</label></td>\n" +
    "            <td><input type=\"text\" ng-model=\"user.firstName\" required style=\"width: 200px;\"/></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><label>Priezvisko</label></td>\n" +
    "            <td><input type=\"text\" ng-model=\"user.lastName\" required style=\"width: 200px;\"/></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><label>E-mail</label></td>\n" +
    "            <td><input type=\"email\" ng-model=\"user.email\" required style=\"width: 200px;\"/></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><label>Heslo</label></td>\n" +
    "            <td><input type=\"password\" ng-model=\"user.password\" required style=\"width: 200px;\"/></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><label>Potvrdenie hesla</label></td>\n" +
    "            <td><input type=\"password\" ng-model=\"user.password2\" required style=\"width: 200px;\"/></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><label>Dátum narodenia</label></td>\n" +
    "            <td><input type=\"date\" ng-model=\"user.date\" required style=\"width: 200px;\"/></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><label>Pohlavie</label></td>\n" +
    "            <td>\n" +
    "                <label for=\"input1\">Muž</label><input type=\"radio\" id=\"input1\" ng-model=\"user.sex\" name=\"radio\" required value=\"Muž\" />\n" +
    "                <label for=\"input2\">Žena</label><input type=\"radio\" id=\"input2\" ng-model=\"user.sex\" name=\"radio\" value=\"Žena\" />\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><input class=\"btn btn-alert\"  type=\"submit\" value=\"Registrovat sa\"></td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</form>");
}]);

angular.module("rooms/rooms.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("rooms/rooms.tpl.html",
    "<div layout=\"row\" layout-sm=\"column\" layout-align=\"start center\">\n" +
    "    <md-text-float label=\"Zadaj text pre filtráciu\" ng-model=\"SearchText\"></md-text-float>\n" +
    "    <h2>{{rooms.length}} / {{(rooms | filter: SearchText).length}}</h2>\n" +
    "</div>\n" +
    "<md-content>\n" +
    "    <md-card layout-padding>\n" +
    "        <md-toolbar class=\"md-theme-light\">\n" +
    "            <h1 class=\"md-toolbar-tools\">\n" +
    "                <span>Zoznam miestnosti v Databáze</span>\n" +
    "            </h1>\n" +
    "        </md-toolbar>\n" +
    "        <md-content>\n" +
    "            <md-list>\n" +
    "                <md-item ng-repeat=\"room in rooms | filter: SearchText | orderBy:'room.order'\">\n" +
    "                    <md-item-content>\n" +
    "                        <div class=\"md-tile-content md-padding\" layout=\"row\" layout-sm=\"column\" layout-margin layout-align=\"left center\">\n" +
    "                            <md-text-float label=\"Poradie miestnosti\" ng-model=\"room.order\" disabled></md-text-float>\n" +
    "                            <md-text-float label=\"Názov miestnosti\" ng-model=\"room.name\"></md-text-float>\n" +
    "                            <md-text-float label=\"Pozícia miestnosti\" ng-model=\"room.positioning\"></md-text-float>\n" +
    "                            <div layout=\"row\" layout-sm=\"column\" layout-margin layout-align=\"left center\">\n" +
    "                                <md-button class=\"md-raised md-primary\" ng-click=\"SaveRoom(room)\">Uložiť</md-button>\n" +
    "                                <md-button class=\"md-raised\" ng-click=\"CleanRoom(room)\">Vyčistiť</md-button>\n" +
    "                                <md-button class=\"md-raised md-warn\" ng-click=\"DeleteRoom(room)\">Vymazať</md-button>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </md-item-content>\n" +
    "                </md-item>\n" +
    "            </md-list>\n" +
    "        </md-content>\n" +
    "    </md-card>\n" +
    "</md-content>\n" +
    "<md-content>\n" +
    "    <md-card layout-padding>\n" +
    "        <md-toolbar class=\"md-theme-light\">\n" +
    "            <h1 class=\"md-toolbar-tools\">\n" +
    "                <span>Uložiť novú miestnosť do Databázy</span>\n" +
    "            </h1>\n" +
    "        </md-toolbar>\n" +
    "        <div layout=\"row\" layout-sm=\"column\" layout-margin layout-align=\"left center\">\n" +
    "            <md-text-float label=\"Názov miestnosti\" ng-model=\"newRoom.name\"></md-text-float>\n" +
    "            <md-text-float label=\"Pozícia miestnosti\" ng-model=\"newRoom.positioning\"></md-text-float>\n" +
    "            <md-button class=\"md-raised md-primary\" ng-click=\"AddRoom(newRoom)\" style=\"max-height: 40px\">Vytvoriť</md-button>\n" +
    "        </div>\n" +
    "    </md-card>\n" +
    "</md-content>\n" +
    "");
}]);

angular.module("seats/seats.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("seats/seats.tpl.html",
    "<style>\n" +
    "    td\n" +
    "    {\n" +
    "        width: 140px;\n" +
    "        text-align: center;\n" +
    "        border: 2px solid black;\n" +
    "    }\n" +
    "    th\n" +
    "    {\n" +
    "        width: 140px;\n" +
    "        text-align: center;\n" +
    "        border: 2px solid black;\n" +
    "    }\n" +
    "    table\n" +
    "    {\n" +
    "        border: 2px solid black;\n" +
    "        margin-left: 100px;\n" +
    "    }\n" +
    "</style>\n" +
    "<div layout=\"row\" layout-sm=\"column\" layout-align=\"start center\">\n" +
    "    <md-text-float label=\"Zadaj text pre filtráciu\" ng-model=\"SearchText\"></md-text-float>\n" +
    "    <table>\n" +
    "        <tr>\n" +
    "            <th><h3>Celkový počet</h3></th>\n" +
    "            <th><h3>Rezervované </h3></th>\n" +
    "            <th><h3>Zaplatené </h3></th>\n" +
    "            <th><h3>Voľné </h3></th>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td><h3>[{{(seats | filter: SearchText).length}}]</h3></td>\n" +
    "            <td><h3>[{{(seats | filter: SearchText | filter: 'Rezervovaný').length}}]</h3></td>\n" +
    "            <td><h3>[{{(seats | filter: SearchText | filter: 'Zaplatený').length}}]</h3></td>\n" +
    "            <td><h3>[{{(seats | filter: SearchText | filter: 'Voľný').length}}]</h3></td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>\n" +
    "<md-card layout-padding>\n" +
    "    <md-toolbar class=\"md-theme-light\">\n" +
    "        <h1 class=\"md-toolbar-tools\">\n" +
    "            <span>Zoznam miest uložených v Databáze</span>\n" +
    "        </h1>\n" +
    "    </md-toolbar>\n" +
    "    <md-content>\n" +
    "        <md-list>\n" +
    "            <md-item ng-repeat=\"seat in seats | filter: SearchText | orderBy:'seat.order'\">\n" +
    "                <md-item-content>\n" +
    "                    <div layout=\"column\">\n" +
    "                        <div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">\n" +
    "                            <md-text-float label=\"Poradové číslo\" ng-model=\"seat.order\" disabled></md-text-float>\n" +
    "                            <h4> Stav miesta: </h4>\n" +
    "                            <select ng-init=\"changeSeat.state = states[seat.state.num]._id\" ng-model=\"changeSeat.state\" ng-options=\"state._id as state.name for state in states\" required></select>\n" +
    "                            <span> Miestnosť: </span>\n" +
    "                            <select ng-init=\"changeSeat.room = rooms[seat.room.order]._id\" ng-model=\"changeSeat.room\" ng-options=\"room._id as room.name for room in rooms\" required></select>\n" +
    "                            <span>Časť v miestnosti</span>\n" +
    "                            <select ng-init=\"changeSeat.part = parts[seat.part.order]._id\" ng-model=\"changeSeat.part\" ng-options=\"part._id as part.name for part in parts\" required></select>\n" +
    "                            <span> Stôl číslo: </span>\n" +
    "                            <select ng-init=\"changeSeat.table = tables[seat.table.order]._id\" ng-model=\"changeSeat.table\" ng-options=\"table._id as table.order for table in tables\" required></select>\n" +
    "                        </div>\n" +
    "                        <div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">\n" +
    "                            <md-text-float label=\"Krstné meno\" ng-model=\"seat.profile.first_name\" disabled></md-text-float>\n" +
    "                            <md-text-float label=\"Priezvisko\" ng-model=\"seat.profile.last_name\" disabled></md-text-float>\n" +
    "                            <md-text-float label=\"eMail\" ng-model=\"seat.profile.email\" disabled></md-text-float>\n" +
    "                            <md-text-float label=\"Mobil\" ng-model=\"seat.profile.mobil\" disabled></md-text-float>\n" +
    "                            <div layout=\"row\" layout-align=\"start center\">\n" +
    "                                <span layout=\"center\"> Viac ako 18 rokov: </span>\n" +
    "                                <md-checkbox aria-label=\"{{seat.profile.under_18}}\" ng-model=\"seat.profile.under_18\"></md-checkbox>\n" +
    "                            </div>\n" +
    "                            <div layout=\"row\" layout-align=\"start center\">\n" +
    "                                <md-button class=\"md-raised md-primary\" ng-click=\"SaveSeat(seat, changeSeat)\">Uložiť</md-button>\n" +
    "                                <md-button class=\"md-raised\" ng-click=\"CleanSeat(seat)\">Vyčistiť</md-button>\n" +
    "                                <md-button class=\"md-raised md-warn\" ng-click=\"DeleteSeat(seat)\">Vymazať</md-button>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </md-item-content>\n" +
    "            </md-item>\n" +
    "            </md-list>\n" +
    "        </md-content>\n" +
    "    </md-card>\n" +
    "</md-content>\n" +
    "\n" +
    "<md-card layout-padding>\n" +
    "    <md-toolbar class=\"md-theme-light\">\n" +
    "        <h1 class=\"md-toolbar-tools\">\n" +
    "            <span>Pridať miesto do Databázy</span>\n" +
    "        </h1>\n" +
    "    </md-toolbar>\n" +
    "    <md-content>\n" +
    "        <div layout=\"column\">\n" +
    "            <div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">\n" +
    "                <md-text-float label=\"Krstné meno\" ng-model=\"addSeat.profile.first_name\" disabled></md-text-float>\n" +
    "                <md-text-float label=\"Priezvisko\" ng-model=\"addSeat.profile.last_name\" disabled></md-text-float>\n" +
    "                <md-text-float label=\"eMail\" ng-model=\"addSeat.profile.email\" disabled></md-text-float>\n" +
    "                <md-text-float label=\"Mobil\" ng-model=\"addSeat.profile.mobil\" disabled></md-text-float>\n" +
    "                <div layout=\"row\" layout-align=\"start center\">\n" +
    "                    <span layout=\"center\"> Viac ako 18 rokov: </span>\n" +
    "                    <md-checkbox aria-label=\"{{addSeat.profile.under_18}}\" ng-model=\"addSeat.profile.under_18\" selected></md-checkbox>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">\n" +
    "                <span> Miestnosť: </span>\n" +
    "                <select ng-model=\"addSeat.room\" ng-options=\"room._id as room.name for room in rooms\" required></select>\n" +
    "                <span> Časť miestnosti: </span>\n" +
    "                <select ng-model=\"addSeat.part\" ng-options=\"part._id as part.name for part in parts\" required></select>\n" +
    "                <span> Stôl číslo: </span>\n" +
    "                <select ng-model=\"addSeat.table\"  ng-options=\"table as table.order for table in tables\" required></select>\n" +
    "                <h4> Stav miesta: </h4>\n" +
    "                <select ng-model=\"addSeat.state\" ng-options=\"state._id as state.name for state in states\" required></select>\n" +
    "                <div layout=\"row\" layout-align=\"start center\">\n" +
    "                    <md-button class=\"md-raised md-primary\" ng-click=\"AddSeat(addSeat)\">Vytvoriť</md-button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </md-content>\n" +
    "</md-card>\n" +
    "\n" +
    "");
}]);

angular.module("states/states.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("states/states.tpl.html",
    "<div layout=\"row\" layout-sm=\"column\" layout-align=\"start center\">\n" +
    "    <md-text-float label=\"Zadaj text pre filtráciu\" ng-model=\"SearchText\"></md-text-float>\n" +
    "    <h2>{{states.length}} / {{(states | filter: SearchText).length}}</h2>\n" +
    "</div>\n" +
    "<md-card layout-padding>\n" +
    "    <md-toolbar class=\"md-theme-light\">\n" +
    "        <h1 class=\"md-toolbar-tools\">\n" +
    "            <span>Zoznam stavov miest uložených v Databáze</span>\n" +
    "        </h1>\n" +
    "    </md-toolbar>\n" +
    "    <md-content>\n" +
    "        <md-list>\n" +
    "            <md-item ng-repeat=\"state in states | filter: SearchText | orderBy:'num'\">\n" +
    "                <md-item-content>\n" +
    "                    <div layout=\"column\">\n" +
    "                        <div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">\n" +
    "                            <md-text-float label=\"Poradové číslo stavu\" ng-model=\"state.num\" disabled></md-text-float>\n" +
    "                            <md-text-float label=\"Pomenovanie stavu\" ng-model=\"state.name\" disabled></md-text-float>\n" +
    "                            <md-text-float label=\"Farba stavu\" ng-model=\"state.color\" disabled></md-text-float>\n" +
    "                            <div layout=\"row\" layout-sm=\"column\" layout-margin layout-align=\"left center\">\n" +
    "                                <md-button class=\"md-raised md-primary\" ng-click=\"SaveState(state)\">Uložiť</md-button>\n" +
    "                                <md-button class=\"md-raised \" ng-click=\"CleanState(state)\">Vyčistiť</md-button>\n" +
    "                                <md-button class=\"md-raised md-warn\" ng-click=\"DeleteState(state)\">Vymazať</md-button>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </md-item-content>\n" +
    "            </md-item>\n" +
    "        </md-list>\n" +
    "    </md-content>\n" +
    "</md-card>\n" +
    "\n" +
    "<md-card layout-padding>\n" +
    "    <md-toolbar class=\"md-theme-light\">\n" +
    "        <h1 class=\"md-toolbar-tools\">\n" +
    "            <span>Pridať nový stav miesta do Databázy</span>\n" +
    "        </h1>\n" +
    "    </md-toolbar>\n" +
    "    <md-content>\n" +
    "        <div layout=\"column\">\n" +
    "            <div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">\n" +
    "                <md-text-float label=\"Zadaj pomenovanie stavu\" ng-model=\"addState.name\" disabled></md-text-float>\n" +
    "                <md-text-float label=\"Zadaj pomenovanie farby stavu\" ng-model=\"addState.color\" disabled></md-text-float>\n" +
    "                <md-button class=\"md-raised md-primary\" ng-click=\"AddState(addState)\">Vytvoriť</md-button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </md-content>\n" +
    "</md-card>\n" +
    "");
}]);

angular.module("tables/tables.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tables/tables.tpl.html",
    "<div layout=\"row\" layout-sm=\"column\" layout-align=\"start center\">\n" +
    "    <md-text-float label=\"Zadaj text pre filtráciu\" ng-model=\"SearchText\"></md-text-float>\n" +
    "    <h2>{{tables.length}} / {{(tables | filter: '548afd22436b8c341c8d1efb').length}} / {{(tables| filter: '548afd22436b8c341c8d1efc').length}}</h2>\n" +
    "</div>\n" +
    "\n" +
    "<md-content>\n" +
    "    <md-card layout-padding>\n" +
    "        <md-toolbar class=\"md-theme-light\">\n" +
    "            <h1 class=\"md-toolbar-tools\">\n" +
    "                <span>Zoznam stolov uložených v Databáze</span>\n" +
    "            </h1>\n" +
    "        </md-toolbar>\n" +
    "        <md-content>\n" +
    "            <md-list>\n" +
    "                <md-item ng-repeat=\"table in tables | filter: SearchText | orderBy:'order'\">\n" +
    "                    <md-item-content >\n" +
    "                        <div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">\n" +
    "                            <md-text-float label=\"Číslo poradia stola\" ng-model=\"table.order\" disabled></md-text-float>\n" +
    "                            <span> Miestnosť: </span>\n" +
    "                            <select ng-init=\"changeTable.room = rooms[table.room.order]._id\" ng-model=\"changeTable.room\" ng-options=\"room._id as room.name for room in rooms\" required></select>\n" +
    "                            <span>Časť v miestnosti</span>\n" +
    "                            <select ng-init=\"changeTable.part = parts[table.part.order]._id\" ng-model=\"changeTable.part\" ng-options=\"part._id as part.name for part in parts\" required></select>\n" +
    "                            <md-button class=\"md-raised md-primary\" ng-click=\"SaveTable(table, changeTable)\"> Uložiť </md-button>\n" +
    "                            <md-button class=\"md-raised\" ng-click=\"CleanTable(table)\"> Vyčistiť </md-button>\n" +
    "                            <md-button class=\"md-raised md-warn\" ng-click=\"DeleteTable(table)\"> Vymazať </md-button>\n" +
    "                        </div>\n" +
    "                    </md-item-content>\n" +
    "                </md-item>\n" +
    "            </md-list>\n" +
    "        </md-content>\n" +
    "    </md-card>\n" +
    "</md-content>\n" +
    "<md-content>\n" +
    "    <md-card layout-padding>\n" +
    "        <md-toolbar class=\"md-theme-light\">\n" +
    "            <h1 class=\"md-toolbar-tools\">\n" +
    "                <span>Uložiť nový stôl do Databázy</span>\n" +
    "            </h1>\n" +
    "        </md-toolbar>\n" +
    "        <div class=\"md-tile-content\" layout=\"row\" class=\"md-padding\">\n" +
    "            <md-text-float label=\"Číslo poradia stola\" ng-model=\"addTable.order\" disabled></md-text-float>\n" +
    "            <span> Miestnosť: </span>\n" +
    "            <select ng-model=\"addTable.room\" ng-options=\"room._id as room.name for room in rooms\" required></select>\n" +
    "            <span> Časť miestnosti: </span>\n" +
    "            <select ng-model=\"addTable.part\" ng-options=\"part._id as part.name for part in parts\" required></select>\n" +
    "            <md-button class=\"md-raised md-primary\" ng-click=\"AddTable(addTable)\">Vytvoriť</md-button>\n" +
    "        </div>\n" +
    "    </md-card>\n" +
    "</md-content>\n" +
    "");
}]);

angular.module("users/users.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("users/users.tpl.html",
    "<h1>Users</h1>\n" +
    "\n" +
    "<h3>{{users.length}} / {{(users | filter: SearchText).length}}</h3>\n" +
    "<br/>\n" +
    "\n" +
    "<div>\n" +
    "    <h4>Filtruj: </h4>\n" +
    "    <h5><input type=\"text\" ng-model=\"SearchText\" placeholder=\"Zadaj text pre filtráciu\"/></h5>\n" +
    "</div>\n" +
    "<br/>\n" +
    "\n" +
    "<div ng-repeat=\"user in users | filter: SearchText | orderBy:'profile.email'\">\n" +
    "    <!--<md-text-float label=\"{{profile.first_name}}\" ng-model=\"profile.first_name\" disabled></md-text-float>-->\n" +
    "    <!--<select ng-init=\"changeState = states[state.num]\" ng-model=\"changeState\" ng-options=\"state.name for state in states\" required></select>-->\n" +
    "    <div layout=\"row\" layout-sm=\"column\" layout-margin layout-align=\"left center\">\n" +
    "        <md-button class=\"md-raised md-primary\" ng-click=\"SaveUser(user)\">Uložiť</md-button>\n" +
    "        <md-button class=\"md-raised\" ng-click=\"CleanUser(user)\">Vyčistiť</md-button>\n" +
    "        <md-button class=\"md-raised md-warn\" ng-click=\"DeleteUser(user)\">Vymazať</md-button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div>\n" +
    "    <input type=\"text\" ng-model=\"addUser.profile.first_name\" placeholder=\"Zadaj názov stavu\"/>\n" +
    "    <div layout=\"row\" layout-sm=\"column\" layout-margin layout-align=\"left center\">\n" +
    "        <md-button class=\"md-raised md-primary\" ng-click=\"AddUser(addUser)\">Vytvoriť</md-button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
