### BDD

Ciclo de BDD
+ Escribir STORY USER / FEATURES   (ProductOwner task)
+ Escribir escenarios
+ Automatizar pruebas de aceptación.


The Story User is written in Gherkin (.feature). Gherkin is a lenguage on bussines or DSL (Domain-specific language).

+ Structure of DSL :
  + Feature
  + Scenario:
    + Given
    + When
    + Then

for example Cucumber understand .features files.


Tools that uses Gherkin:
+ Java: 	JBehave , JDave , Instinct , beanSpec
+ C:	CSpec
+ C#:	NSpec, NBehave
+ .NET:	NSpec , NBehave, SpecFlow
+ PHP:	PHPSpec, Behat
+ Ruby:	RSpec, Cucumber
+ JavaScript:	JSSpec , jspec
+ Phython:	Freshen


(Hay un paso entre Story user e implementacion de los test. se llama: crear los CASOS DE PRUEBA estos son los que explican COMO se debe comportar el sistema)

Necesitamos un rápido feedback de nuestro código (TDD), necesitamos saber que las distintas porciones de código desarrollados se integran según lo esperado (BDD) y simplificando bastante el concepto de ATDD, necesitamos saber que estamos construyendo lo correcto (BDD contribuye a esto mismo).
