import slick.jdbc.PostgresProfile.api._

case class Person(id: Long, fullName: String, dateOfBirth: String, nationality: String)

class PersonTable(tag: Tag) extends Table[Person](tag, "persons") {
  def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
  def fullName = column[String]("full_name")
  def dateOfBirth = column[String]("date_of_birth")
  def nationality = column[String]("nationality")

  def * = (id, fullName, dateOfBirth, nationality) <> (Person.tupled, Person.unapply)
}

object PersonTable {
  val persons = TableQuery[PersonTable]
}