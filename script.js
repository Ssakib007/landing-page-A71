(function(){
    'use strict';
    document.getElementById('year').textContent = String(new Date().getFullYear());
    var inputIds=['price','landed','fba','referral','ads','other','units'];
    var usd=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
    var usdc=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2});
    function number(id){var el=document.getElementById(id);var n=Number(el.value);return Number.isFinite(n)?Math.max(0,n):0;}
    function updateEconomics(){
      var price=number('price'),landed=number('landed'),fba=number('fba'),referral=Math.min(100,number('referral'))/100,ads=number('ads'),other=number('other'),units=Math.min(1000000,Math.floor(number('units')));
      var unitcost=landed+fba+(price*referral)+ads+other;
      var contrib=price-unitcost,revenue=price*units,cost=unitcost*units,monthly=contrib*units,margin=price>0?100*contrib/price:0;
      document.getElementById('monthly').textContent=usd.format(monthly);
      document.getElementById('monthly').classList.toggle('negative',monthly<0);
      document.getElementById('perunit').textContent=usdc.format(contrib)+' per unit · '+margin.toFixed(1)+'% contribution margin';
      document.getElementById('revenue').textContent=usd.format(revenue);
      document.getElementById('unitcost').textContent=usdc.format(unitcost);
      document.getElementById('totalcost').textContent=usd.format(cost);
      var contributionShare=price>0?Math.min(100,Math.max(0,margin)):0;
      document.getElementById('costbar').style.width=(100-contributionShare)+'%';
      document.getElementById('contribbar').style.width=contributionShare+'%';
      document.getElementById('stackbar').setAttribute('aria-label',contributionShare.toFixed(1)+'% contribution, balance variable costs; if contribution is negative, losses are not represented by the bar');
    }
    inputIds.forEach(function(id){document.getElementById(id).addEventListener('input',updateEconomics);});updateEconomics();
  })();
  function closeMenu(){var menu=document.getElementById('mobile-menu'),btn=document.getElementById('menu-btn');menu.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.textContent='☰';}
  function toggleMenu(){var menu=document.getElementById('mobile-menu'),btn=document.getElementById('menu-btn');var open=menu.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.textContent=open?'×':'☰';}
  var editing=false;
  function toggleEdit(){editing=!editing;document.body.classList.toggle('edit-active',editing);document.querySelectorAll('[data-editable]').forEach(function(el){if(editing){el.setAttribute('contenteditable','true');el.setAttribute('spellcheck','false');}else{el.removeAttribute('contenteditable');el.removeAttribute('spellcheck');}});var btn=document.getElementById('edit-toggle');btn.textContent=editing?'✓ Quick-Edit: ON':'✎ Quick-Edit: OFF';btn.setAttribute('aria-pressed',String(editing));}
  function exportCleanHTML(){
    if(editing)toggleEdit();
    var clone=document.documentElement.cloneNode(true);var bar=clone.querySelector('#admin-bar');if(bar)bar.remove();clone.querySelectorAll('[data-editable]').forEach(function(el){el.removeAttribute('data-editable');el.removeAttribute('contenteditable');el.removeAttribute('spellcheck');});clone.querySelector('body').classList.remove('edit-active');
    var html='<!DOCTYPE html>\n'+clone.outerHTML;var blob=new Blob([html],{type:'text/html;charset=utf-8'});var url=URL.createObjectURL(blob);var link=document.createElement('a');link.href=url;link.download='area71-mps-production.html';document.body.appendChild(link);link.click();link.remove();setTimeout(function(){URL.revokeObjectURL(url);},2000);
  }



