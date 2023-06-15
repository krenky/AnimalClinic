using ApiService.Models;

namespace ApiService.Interface
{
    public interface ICRDIntermediateModel<T>
    {
        void Add(T newData);
        void Delete(T data);
        ICollection<T> GetList(int id);
        ICollection<T> GetList();
    }
}
