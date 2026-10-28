# Copia as imagens locais (geradas durante o design no Figma) para assets/img do site.
$S = 'C:\Users\beatr\AppData\Local\Temp\claude\C--Users-beatr\0de3da27-ce67-48aa-a54c-f235aea8f020\scratchpad'
$R = Split-Path -Parent $PSScriptRoot
$I = Join-Path $R 'assets\img'
function CopyAsset($src, $dst) { if (Test-Path $src) { New-Item -ItemType Directory -Force (Split-Path $dst) | Out-Null; Copy-Item $src $dst -Force } else { Write-Host "FALTA: $src" } }

# --- avatar, foto, logos, marca, ferramentas
CopyAsset "$S\avatar\pose-center.jpg" "$I\avatar\center.jpg"
CopyAsset "$S\avatar\pose-left.jpg"   "$I\avatar\left.jpg"
CopyAsset "$S\avatar\pose-right.jpg"  "$I\avatar\right.jpg"
CopyAsset "$S\avatar\pose-down2.jpg"  "$I\avatar\down.jpg"
CopyAsset "$S\avatar\pose-up2.jpg"    "$I\avatar\up.jpg"
# (foto agora vem do layout do Figma; não sobrescrever) CopyAsset 'C:\Users\beatr\AppData\Local\Temp\claude\C--Users-beatr\0de3da27-ce67-48aa-a54c-f235aea8f020\images\2.jpg' "$I\me\foto.jpg"
CopyAsset "$S\avatar\logo-pink.png"  "$I\logo\biatriz-rosa.png"
CopyAsset "$S\avatar\logo-green.png" "$I\logo\biatriz-verde.png"
CopyAsset "$S\avatar\brand-green-clean.jpg" "$I\brand\logo-verde.jpg"
CopyAsset "$S\avatar\brand-pink-clean.jpg"  "$I\brand\logo-rosa.jpg"
CopyAsset "$S\avatar\brand-pattern.jpg"     "$I\brand\padrao.jpg"
foreach ($t in 'figma-color','notion','trello','claude','html5','css','sass','javascript','bootstrap','rubyonrails','chatgpt') { CopyAsset "$S\logos\$t.svg" "$I\tools\$t.svg" }
CopyAsset 'C:\Users\beatr\Downloads\curriculo-beatriz.pdf' (Join-Path $R 'assets\curriculo-beatriz.pdf')

# --- mockups (cenas): janela principal (a) e secundaria (b)
$m = @{
 'alfama-web'=@('crops\aw-a'); 'gerador-de-criativos'=@('crops\gcrit-a','crops\gcrit-b'); 'terrah'=@('crops\terrah-a','crops\terrah-b');
 'gerador-de-landing-pages'=@('crops\glp-a'); 'primasa-camel'=@('crops\primasa-a','crops\primasa-b'); 'gsp'=@('crops\gspsite-a','crops\gspsim-a');
 'stanza'=@('crops\stanza-a','crops\stanza-b'); 'parque-arvoredo'=@('crops\arvoredo-a','crops\arvoredo-b'); 'entre-rios'=@('crops\entrerios-a','crops\entrerios-b');
 'iel'=@('crops\iel-a','crops\iel-b'); 'fies'=@('crops\fies-a','crops\fies-b'); 'sesi'=@('crops\sesi-a','crops\sesi-b'); 'senai'=@('crops\senai-a','crops\senai-b');
 'yvaz'=@('crops\yvaz-a','crops\yvaz-b'); 'avendre-pay'=@('crops\avendre-a','crops\avendre-b'); 'gerador-de-conteudo'=@('crops\gcont-a');
 'cv-banco-de-talentos'=@('crops\cvbanco-a','crops\cvbanco-b'); 'indica-cv'=@('crops\indicacv-a','crops\indicacv-b');
 'lp-comercial-agente-de-ia'=@('crops2\agenteia-a','crops2\agenteia-b'); 'aipim'=@('crops2\aipim-a','crops2\aipim-b'); 'lp-comercial-construtoras'=@('crops2\construtoras-a','crops2\construtoras-b');
 'la-lena-fhv'=@('crops2\lalena-a','crops2\lalena-b'); 'ad-haus'=@('crops2\adhaus-a','crops2\adhaus-b'); 'carrilho-infraestrutura'=@('crops2\carrilho-a','crops2\carrilho-b');
 'alfama-personalizacao'=@('crops2\pers-a','crops2\pers-b'); 'vex'=@('crops2\vex-a','crops2\vex-b'); 'cepjss'=@('crops2\cepjss-a','crops2\cepjss-b');
 'skill-mapa-de-conteudo'=@('crops2\skill-a','crops2\skill-b'); 'plugin-wordpress-mapa-de-conteudo'=@('crops2\plugin-a','crops2\plugin-b')
}
foreach ($k in $m.Keys) { $n = 0; foreach ($f in $m[$k]) { $suf = @('a','b')[$n]; CopyAsset "$S\$f.jpg" "$I\mock\$k-$suf.jpg"; $n++ } }

# --- imagens dos estudos de caso: slug -> pasta -> arquivos (sem extensao), na ordem usada no design
$c = @(
 @('alfama-web','agent-a\out',@('aw2-home-s1','aw2-home-s2','aw2-projects-s1','aw-m1','aw-m2','aw-m3')),
 @('gerador-de-criativos','agent-a\out',@('gc-home-s1','gc-pieces-s1','gc-admin-s1','gc-m1','gc-m2','gc-m3')),
 @('terrah','agent-a\out',@('tr-home-s1','tr-home-s2','tr-dev-s1','tr-det-s1','tr-m1','tr-m2','tr-m3')),
 @('gerador-de-landing-pages','agent-a\out',@('gl-home-s1','gl-g4-s1','gl-lp-s1','gl-m1','gl-m2','gl-m3')),
 @('primasa-camel','agent-a\out',@('pc-home-s1','pc-home-s2','pc-dev-s1','pc-det-s1','pc-m1','pc-m2','pc-m3')),
 @('parque-arvoredo','agent-b\out',@('arvoredo-home-s1','arvoredo-home-s2','arvoredo-form-s1','arvoredo-m1','arvoredo-m2')),
 @('entre-rios','agent-b\out',@('entrerios-home-s1','entrerios-home-s2','entrerios-products-s1','entrerios-agua-s1','entrerios-m1','entrerios-m2','entrerios-m3')),
 @('iel','agent-b\out',@('iel-home-s1','iel-home-s2','iel-solucoes-s1','iel-sobre-s1','iel-m1','iel-m2','iel-m3')),
 @('fies','agent-b\out',@('fies-home-s1','fies-home-s2','fies-news-s1','fies-about-s1','fies-m1','fies-m2','fies-m3')),
 @('sesi','agent-b\out',@('sesi-home-s1','sesi-educacao-s1','sesi-saude-s1','sesi-m1','sesi-m2','sesi-m3')),
 @('senai','agent-c',@('senai-home-s1','senai-home-s2','senai-np-s1','senai-ip-s1','senai-m1','senai-m2','senai-m3')),
 @('yvaz','agent-c',@('yv-home-s1','yv-home-s2','yv-nalu-s1','yv-menu-s1','yv-m1','yv-m2','yv-m3')),
 @('avendre-pay','agent-c',@('ap-home-s1','ap-home-s2','ap-inc-s1','ap-cor-s1','ap-m1','ap-m2')),
 @('gerador-de-conteudo','agent-c',@('gc-f1-s1','gc-f2-s1','gc-f6-s1')),
 @('cv-banco-de-talentos','agent-c',@('cv-m1','cv-m2','cv-m3')),
 @('indica-cv','agent-d',@('indica-home-s1','indica-home-s2','indica-m1','indica-m2')),
 @('lp-comercial-agente-de-ia','agent-d',@('lpia-home-s1','lpia-home-s2','lpia-m1')),
 @('aipim','agent-d',@('aipim-home-s1','aipim-home-s2','aipim-prod-s1','aipim-sobre-s1','aipim-m1','aipim-m2','aipim-m3')),
 @('lp-comercial-construtoras','agent-d',@('constr-home-s1','constr-home-s2','constr-serv-s1','constr-cont-s1','constr-m1','constr-m2','constr-m3')),
 @('la-lena-fhv','agent-d',@('lalena-home-s1','lalena-avail-s1','lalena-lot-s1','lalena-m1','lalena-m2','lalena-m3')),
 @('carrilho-infraestrutura','agent-e',@('carr-home-s1','carr-home-s2','carr-proj-s1','carr-det-s1','carr-m1','carr-m2','carr-m3')),
 @('alfama-personalizacao','agent-e',@('alf-home-s1','alf-abe-s1','alf-log-s1','alf-m1','alf-m2','alf-m3')),
 @('cepjss','agent-e',@('cep-home-s1','cep-home-s2','cep-ds-s1','cep-m1')),
 @('skill-mapa-de-conteudo','agent-e',@('skillmc-s1')),
 @('plugin-wordpress-mapa-de-conteudo','agent-e',@('plugmc-s1','plugmc-s2'))
)
foreach ($e in $c) { foreach ($f in $e[2]) { CopyAsset "$S\$($e[1])\$f.jpg" "$I\cases\$($e[0])\$f.jpg" } }
# estudo de caso do CV Banco (telas desktop refeitas)
foreach ($f in 'cvfix-list-s1','cvfix-detail-s1','cvfix-done-s1') { CopyAsset "$S\cvfix\out\$f.jpg" "$I\cases\cv-banco-de-talentos\$f.jpg" }
Write-Host 'ok'
