using System.ComponentModel.DataAnnotations;

namespace InvestingOak.Models
{
    public class ProjectDescModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public decimal Balance { get; set; }
    }
}
