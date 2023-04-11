import akka.actor.typed.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.Future
import scala.io.StdIn
import scala.util.{Failure, Success}
import spray.json.DefaultJsonProtocol._

object HelloWorldAkka {
  def main(args: Array[String]): Unit = {
    implicit val system = ActorSystem(Behaviors.empty, "HelloWorldAkka")
    implicit val executionContext = system.executionContext

    val db = DatabaseConfig.config.db

    val createTable = PersonTable.persons.schema.create
    db.run(createTable).onComplete {
      case Success(_) => println("Table created successfully")
      case Failure(ex) => println(s"Failed to create table: $ex")
    }

    case class CreatePerson(fullName: String, dateOfBirth: String, nationality: String)

    implicit val createPersonFormat = jsonFormat3(CreatePerson)

    val route =
      path("hello") {
        get {
          complete(HttpEntity(ContentTypes.`text/html(UTF-8)`, "<h1>Hello, world!</h1>"))
        } ~
          post {
            entity(as[CreatePerson]) { createPerson =>
              val insertPerson = PersonTable.persons += Person(0, createPerson.fullName, createPerson.dateOfBirth, createPerson.nationality)
              onComplete(db.run(insertPerson)) {
                case Success(_) => complete(StatusCodes.Created, "Person created successfully")
                case Failure(ex) => complete(StatusCodes.InternalServerError, s"An error occurred: ${ex.getMessage}")
              }
            }
          }
      }

    val bindingFuture = Http().newServerAt("localhost", 8080).bind(route)

    println("Server online at http://localhost:8080/\nPress RETURN to stop...")
    StdIn.readLine()
    bindingFuture
      .flatMap(_.unbind())
      .onComplete(_ => system.terminate())
  }
}
