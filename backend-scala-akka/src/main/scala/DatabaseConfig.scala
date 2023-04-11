import slick.basic.DatabaseConfig
import slick.jdbc.JdbcProfile

object DatabaseConfig {
  val config = DatabaseConfig.forConfig[JdbcProfile]("database")
}