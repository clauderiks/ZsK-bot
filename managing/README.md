# Gestion d’un domaine personnalisé pour votre site GitHub Pages

Vous pouvez configurer ou mettre à jour certains enregistrements DNS et vos paramètres de dépôt pour pointer le domaine par défaut de votre site GitHub Pages vers un domaine personnalisé.

Les personnes disposant d’autorisations d’administrateur sur un dépôt peuvent configurer un domaine personnalisé pour un site GitHub Pages.

## À propos de la configuration de domaines personnalisés

> \[!TIP]
> Nous vous recommandons de vérifier votre domaine personnalisé avant de l’ajouter à votre dépôt afin d’améliorer la sécurité et d’éviter les attaques de prise de contrôle. Pour plus d’informations, consultez « [Vérification de votre domaine personnalisé pour GitHub Pages](/fr/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) ».

Veillez à ajouter votre domaine personnalisé à votre site GitHub Pages avant de configurer votre domaine personnalisé auprès de votre fournisseur DNS. La configuration de votre domaine personnalisé auprès de votre fournisseur DNS sans ajouter votre domaine personnalisé à GitHub peut entraîner la possibilité pour une autre personne d’héberger un site sur un de vos sous-domaines.

<div class="ghd-tool windows">

La commande `dig`, qui peut être utilisée pour vérifier la configuration correcte des enregistrements DNS, n’est pas incluse dans Windows. Pour vérifier que vos enregistrements DNS sont configurés correctement, vous pouvez utiliser la commande PowerShell `Resolve-DnsName` ou installer [BIND](https://www.isc.org/bind/).

</div>

> \[!NOTE]
> Les changements de DNS peuvent prendre jusqu'à 24 heures pour se propager.

## Configuration d’un domaine apex

Pour configurer un domaine apex, comme `example.com`, vous devez configurer un domaine personnalisé dans vos paramètres de dépôt et au moins un enregistrement `ALIAS`, `ANAME` ou `A` avec votre fournisseur DNS.

1. Dans GitHub, accédez au dépôt de votre site.
2. Sous le nom de votre référentiel, cliquez sur **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-gear" aria-label="gear" role="img"><path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z"></path></svg> Paramètres**. Si vous ne voyez pas l’onglet « Paramètres », sélectionnez le menu déroulant **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-kebab-horizontal" aria-label="More" role="img"><path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path></svg>** , puis cliquez sur **Paramètres**.

   ![Capture d’écran d’un en-tête de dépôt montrant les onglets. L’onglet « Paramètres » est mis en évidence avec un encadré orange foncé.](/assets/images/help/repository/repo-actions-settings.png)
3. Dans la section « Code et automatisation » de la barre latérale, cliquez sur **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-browser" aria-label="browser" role="img"><path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25ZM14.5 6h-13v7.25c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25Zm-6-3.5v2h6V2.75a.25.25 0 0 0-.25-.25ZM5 2.5v2h2v-2Zm-3.25 0a.25.25 0 0 0-.25.25V4.5h2v-2Z"></path></svg> Pages**.
4. Sous « Domaine personnalisé », entrez votre domaine personnalisé, puis cliquez sur **Enregistrer**. Si vous publiez votre site à partir d’une branche, cela crée un commit qui ajoute un fichier `CNAME` directement à la racine de votre branche source. Si vous publiez à partir d’un flux de travail personnalisé GitHub Actions, aucun fichier `CNAME` n'est créé, et tout fichier `CNAME` existant est ignoré et n’est pas requis. Pour plus d’informations sur votre source de publication, consultez [Configuration d’une source de publication pour votre site GitHub Pages](/fr/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
5. Accédez à votre fournisseur DNS et créez un enregistrement `ALIAS`, `ANAME` ou `A`. Vous pouvez aussi créer des enregistrements `AAAA` pour la prise en charge d’IPv6. Si vous implémentez le support IPv6, nous vous recommandons vivement d’utiliser un enregistrement `A` en plus de votre enregistrement `AAAA`, en raison de la lenteur de l’adoption d’IPv6 à l’échelle mondiale. Pour plus d’informations sur la création de l’enregistrement approprié, consultez la documentation de votre fournisseur DNS.
   * Pour créer un enregistrement `ALIAS` ou `ANAME`, faites pointer votre domaine apex vers le domaine par défaut pour votre site. Pour plus d’informations sur le domaine par défaut de votre site, consultez [Qu’est-ce que GitHub Pages ?](/fr/pages/getting-started-with-github-pages/what-is-github-pages#types-of-github-pages-sites).

   * Pour créer des enregistrements `A`, faites pointer votre domaine de premier niveau vers les adresses IP pour GitHub Pages.

     ```shell
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

   * Pour créer des enregistrements `AAAA`, faites pointer votre domaine apex vers les adresses IP de GitHub Pages.

     ```shell
     2606:50c0:8000::153
     2606:50c0:8001::153
     2606:50c0:8002::153
     2606:50c0:8003::153
     ```

> \[!NOTE]
> Si votre fournisseur DNS définit automatiquement un enregistrement par défaut, supprimez-le avant de continuer.

> \[!WARNING]
> Nous vous recommandons vivement de ne pas utiliser d’enregistrements DNS génériques, tels que `*.example.com`. Ces enregistrements vous exposent à un risque immédiat de prise de contrôle de domaine, même si vous vérifiez le domaine. Par exemple, si vous vérifiez `example.com`, vous empêchez un tiers d’utiliser `a.example.com`, mais cette personne peut toujours prendre le contrôle de `b.a.example.com` (couvert par l’enregistrement DNS générique).

1. Ouvrez <span class="platform-mac">Terminal</span><span class="platform-linux">Terminal</span><span class="platform-windows">Git Bash</span>.

2. Pour vérifier que votre enregistrement DNS est correctement configuré, utilisez la commande `dig`, en remplaçant *EXAMPLE.COM* par votre domaine apex. Vérifiez que les résultats correspondent aux adresses IP pour GitHub Pages ci-dessus.
   * Pour les enregistrements `A` :

     ```shell
     $ dig EXAMPLE.COM +noall +answer -t A
     > EXAMPLE.COM    3600    IN A     185.199.108.153
     > EXAMPLE.COM    3600    IN A     185.199.109.153
     > EXAMPLE.COM    3600    IN A     185.199.110.153
     > EXAMPLE.COM    3600    IN A     185.199.111.153
     ```

   * Pour les enregistrements `AAAA` :

     ```shell
     $ dig EXAMPLE.COM +noall +answer -t AAAA
     > EXAMPLE.COM     3600    IN AAAA     2606:50c0:8000::153
     > EXAMPLE.COM     3600    IN AAAA     2606:50c0:8001::153
     > EXAMPLE.COM     3600    IN AAAA     2606:50c0:8002::153
     > EXAMPLE.COM     3600    IN AAAA     2606:50c0:8003::153
     ```

3. Si vous utilisez un générateur de site statique pour générer votre site localement et envoyez les fichiers générés vers GitHub, récupérez le commit qui a ajouté le fichier CNAME à votre dépôt local. Pour plus d’informations, consultez « [Résolution des problèmes liés aux domaines personnalisés et aux pages GitHub](/fr/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages#cname-errors) ».

4. Pour appliquer un chiffrement HTTPS à votre site, vous pouvez sélectionner **Appliquer le protocole HTTPS**. Jusqu’à 24 heures peuvent s’écouler avant que cette option soit disponible. Pour plus d’informations, consultez « [Sécurisation de votre site GitHub Pages avec HTTPS](/fr/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https) ».

### Configuration d’un domaine apex et de la variante de sous-domaine `www`

> \[!NOTE]
> La configuration d’un sous-domaine `www` avec un domaine apex est recommandée pour les sites web sécurisés HTTPS.

Si vous utilisez un domaine apex comme domaine personnalisé, nous vous recommandons également de configurer un sous-domaine `www`. Si vous configurez les enregistrements appropriés pour chaque type de domaine à travers votre fournisseur DNS, GitHub Pages crée automatiquement les redirections entre les domaines. Par exemple, si vous configurez `www.example.com` comme domaine personnalisé pour votre site et que vous avez des enregistrements DNS GitHub Pages configurés pour les domaines `www` et apex, `example.com` redirige vers `www.example.com`. Si vous configurez plutôt `example.com` en tant que domaine personnalisé, alors`www.example.com` redirigera vers `example.com`. Les redirections automatiques s’appliquent également à d’autres sous-domaines, car `www.blog.example.com` redirige vers `blog.example.com` ou inversement. Il est impossible de configurer un domaine qui commence par `www.www.`. Pour plus d’informations, consultez [Configuration d’un sous-domaine](#configuring-a-subdomain).

Accédez à votre fournisseur DNS et créez un enregistrement `CNAME` pour le sous-domaine `www` qui fait pointer vers votre domaine GitHub Pages par défaut. Par exemple, si votre site se trouve sur `<user>.github.io`, vous devez créer un enregistrement `CNAME` qui fait pointer `www.example.com` vers `<user>.github.io`. De même, pour un site d’organisation situé sur `<organization>.github.io`, vous devez créer un enregistrement `CNAME` qui fait pointer `www.example.com` vers `<organization>.github.io`. Vérifiez que l’enregistrement `CNAME` pointe directement vers `<user>.github.io` ou `<organization>.github.io`, sans inclure le nom du référentiel.

Pour plus d’informations sur la création de l’enregistrement approprié, consultez la documentation de votre fournisseur DNS. Pour plus d’informations sur le domaine par défaut de votre site, consultez [Qu’est-ce que GitHub Pages ?](/fr/pages/getting-started-with-github-pages/what-is-github-pages#types-of-github-pages-sites).

## Configuration d’un sous-domaine

Pour configurer un sous-domaine `www` ou personnalisé, comme `www.example.com` ou `blog.example.com`, vous devez ajouter votre domaine dans les paramètres du dépôt. Ensuite, configurez un enregistrement CNAME auprès de votre fournisseur DNS.

1. Dans GitHub, accédez au dépôt de votre site.

2. Sous le nom de votre référentiel, cliquez sur **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-gear" aria-label="gear" role="img"><path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z"></path></svg> Paramètres**. Si vous ne voyez pas l’onglet « Paramètres », sélectionnez le menu déroulant **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-kebab-horizontal" aria-label="More" role="img"><path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path></svg>** , puis cliquez sur **Paramètres**.

   ![Capture d’écran d’un en-tête de dépôt montrant les onglets. L’onglet « Paramètres » est mis en évidence avec un encadré orange foncé.](/assets/images/help/repository/repo-actions-settings.png)

3. Dans la section « Code et automatisation » de la barre latérale, cliquez sur **<svg version="1.1" width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-browser" aria-label="browser" role="img"><path d="M0 2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25ZM14.5 6h-13v7.25c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25Zm-6-3.5v2h6V2.75a.25.25 0 0 0-.25-.25ZM5 2.5v2h2v-2Zm-3.25 0a.25.25 0 0 0-.25.25V4.5h2v-2Z"></path></svg> Pages**.

4. Sous « Domaine personnalisé », entrez votre domaine personnalisé, puis cliquez sur **Enregistrer**. Si vous publiez votre site à partir d’une branche, cela crée un commit qui ajoute un fichier `CNAME` directement à la racine de votre branche source. Si vous publiez à partir d’un flux de travail personnalisé GitHub Actions, aucun fichier `CNAME` n'est créé, et tout fichier `CNAME` existant est ignoré et n’est pas requis. Pour plus d’informations sur votre source de publication, consultez [Configuration d’une source de publication pour votre site GitHub Pages](/fr/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

   > \[!NOTE]
   > Si votre domaine personnalisé est un nom de domaine internationalisé, vous devez entrer la version Punycode encodée.
   >
   > Pour plus d’informations sur Punycode, consultez [Nom de domaine internationalisé](https://en.wikipedia.org/wiki/Internationalized_domain_name).

5. Accédez à votre fournisseur DNS et créez un enregistrement `CNAME` qui fait pointer votre sous-domaine vers le domaine par défaut de votre site. Par exemple, si vous voulez utiliser le sous-domaine `www.example.com` pour votre site utilisateur, créez un enregistrement `CNAME` qui fait pointer `www.example.com` vers `<user>.github.io`. Si vous voulez utiliser le sous-domaine `another.example.com` pour votre site d’organisation, créez un enregistrement `CNAME` qui fait pointer `another.example.com` vers `<organization>.github.io`. L’enregistrement `CNAME` doit toujours pointer vers `<user>.github.io` ou vers `<organization>.github.io`, à l’exclusion du nom du dépôt. Pour plus d’informations sur la création de l’enregistrement approprié, consultez la documentation de votre fournisseur DNS. Pour plus d’informations sur le domaine par défaut de votre site, consultez [Qu’est-ce que GitHub Pages ?](/fr/pages/getting-started-with-github-pages/what-is-github-pages#types-of-github-pages-sites).

   > \[!WARNING]
   > Nous vous recommandons vivement de ne pas utiliser d’enregistrements DNS génériques, tels que `*.example.com`. Ces enregistrements vous exposent à un risque immédiat de prise de contrôle de domaine, même si vous vérifiez le domaine. Par exemple, si vous vérifiez `example.com`, vous empêchez un tiers d’utiliser `a.example.com`, mais cette personne peut toujours prendre le contrôle de `b.a.example.com` (couvert par l’enregistrement DNS générique).

6. Ouvrez <span class="platform-mac">Terminal</span><span class="platform-linux">Terminal</span><span class="platform-windows">Git Bash</span>.

7. Pour vérifier que votre enregistrement DNS est correctement configuré, utilisez la commande `dig`, en remplaçant *[WWW.EXAMPLE.COM](http://WWW.EXAMPLE.COM)* par votre sous-domaine.

   ```shell
   $ dig WWW.EXAMPLE.COM +nostats +nocomments +nocmd
   > ;WWW.EXAMPLE.COM.                    IN      A
   > WWW.EXAMPLE.COM.             3592    IN      CNAME   YOUR-USERNAME.github.io.
   > YOUR-USERNAME.github.io.      43192   IN      CNAME   GITHUB-PAGES-SERVER .
   > GITHUB-PAGES-SERVER .         22      IN      A       192.0.2.1
   ```

8. Si vous utilisez un générateur de site statique pour générer votre site localement et envoyez les fichiers générés vers GitHub, récupérez le commit qui a ajouté le fichier CNAME à votre dépôt local. Pour plus d’informations, consultez « [Résolution des problèmes liés aux domaines personnalisés et aux pages GitHub](/fr/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages#cname-errors) ».

9. Pour appliquer un chiffrement HTTPS à votre site, vous pouvez sélectionner **Appliquer le protocole HTTPS**. Jusqu’à 24 heures peuvent s’écouler a